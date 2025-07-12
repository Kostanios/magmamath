import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { MongoUserEntity, UserEntity } from '../entity';
import { User } from '../schemas';

interface CreateUserEntityParams {
  name: string;
  email: string;
}

interface UpdateUserEntityParams {
  name?: string;
  email?: string;
}

interface GetAllUsersParams {
  page: number;
  limit: number;
}


export interface UserRepository {
  findById(id: string): Promise<UserEntity | null>;
  createOne(params: CreateUserEntityParams): Promise<UserEntity>;
  updateById(id: string, params: UpdateUserEntityParams): Promise<UserEntity | null>;
  getAll(params: GetAllUsersParams): Promise<UserEntity[]>;
  deleteById(id: string): Promise<void>;
  getTotalUsersCount(): Promise<number>;
}

@Injectable()
export class MongoUserRepository implements UserRepository {
  public constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  public async findById(id) {
    const user = await this.userModel
      .findOne({ _id: new ObjectId(id) })
      .lean()
      .exec();

    return user && new MongoUserEntity(user);
  }

  public async createOne(params) {
    const [user] = await this.userModel.create([params]);

    return new MongoUserEntity(user);
  }

  public async updateById(id, params) {
    const user = await this.userModel
      .findOneAndUpdate({ _id: new ObjectId(id) }, params, {
        new: true,
      })
      .lean()
      .exec();

    return user && new MongoUserEntity(user);
  }

  public async getAll(params) {
    const { page, limit } = params;
    const skip = Math.max(0, (page - 1) * limit);
    const users = await this.userModel.find().skip(skip).limit(limit).lean().exec();
    return users.map(user => new MongoUserEntity(user));
  }

  public async getTotalUsersCount(): Promise<number> {
    return this.userModel.countDocuments().exec();
  }

  public async deleteById(id: string): Promise<void> {
    await this.userModel.deleteOne({ _id: new ObjectId(id) }).exec();
  }
}
