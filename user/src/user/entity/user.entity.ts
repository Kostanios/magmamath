import { FlattenMaps } from 'mongoose';
import { ObjectId } from 'mongodb';
import { User } from '../schemas';

export interface UserEntity {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export class MongoUserEntity implements UserEntity {
  constructor(private readonly userDocument: FlattenMaps<User> & { _id: ObjectId }) {}

  public get id() {
    return this.userDocument._id.toString();
  }

  public get name() {
    return this.userDocument.name;
  }

  public get email() {
    return this.userDocument.email;
  }

  public get createdAt() {
    return this.userDocument.createdAt;
  }
}
