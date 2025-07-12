import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRabbitmqService } from '@app/rabbitmq/decorators';
import { InjectUserRepository } from '../decorators/inject-user-repository.decorator';
import { UserRepository } from '../repositories';
import { InjectUserEntityMapper } from '../decorators/inject-user-entity-mapper.decorator';
import { UserEntityToDtoMapper } from '../entity-mappers';
import { UserDto } from '../dto';

export interface UserService {
  getUsers(params: GetAllUsersParams): Promise<{ data: UserDto[], total: number }>;
  createUser(params: CreateUserParams): Promise<UserDto>;
  updateUser(id: string, params: UpdateUserParams): Promise<UserDto>;
  deleteUser(id: string): Promise<{ message: string }>;
  getById(id: string): Promise<UserDto | null>;
}

export interface CreateUserParams {
  name: string;
  email: string;
}

export interface GetAllUsersParams {
  page?: string;
  limit?: string;
}

export interface UpdateUserParams {
  name?: string;
  email?: string;
}

@Injectable()
export class DefaultUserService implements UserService {
  constructor(
    @InjectRabbitmqService() private readonly client: ClientProxy,
    @InjectUserRepository() private readonly userRepository: UserRepository,
    @InjectUserEntityMapper() private readonly userEntityMapper: UserEntityToDtoMapper,
  ) {}

  public async createUser(params: CreateUserParams) {
    const userEntity = await this.userRepository.createOne(params);

    const user = this.userEntityMapper.mapOne(userEntity);

    await this.client.emit('user-created', {
      message: `Welcome onboard ${user.name}!`,
      data: user,
      timestamp: new Date().toISOString(),
    });

    return user;
  }

  public async getById(id: string) {
    const userEntity = await this.userRepository.findById(id);

    if (!userEntity) {
      return null;
    }

    return this.userEntityMapper.mapOne(userEntity);
  }

  public async updateUser(id: string, params: UpdateUserParams) {
    const userEntity = await this.userRepository.updateById(id, params);

    if (!userEntity) {
      throw new Error(`User with id ${id} not found`);
    }

    return this.userEntityMapper.mapOne(userEntity);
  }

  public async getUsers(params: GetAllUsersParams) {
    const { page = 1, limit = 10 } = params;


    const users = await this.userRepository.getAll({
      page: Number(page),
      limit: Number(limit),
    });

    const totalUsersCount = await this.userRepository.getTotalUsersCount();

    return { data: this.userEntityMapper.mapMany(users), total: totalUsersCount };
  }

  public async deleteUser(id: string) {
    const userEntity = await this.userRepository.findById(id);

    if (!userEntity) {
      throw new Error(`User with id ${id} not found`);
    }

    await this.userRepository.deleteById(id);

    const user = this.userEntityMapper.mapOne(userEntity);

    await this.client.emit('user-deleted', {
      message: `Goodbye ${userEntity.name}!`,
      data: user,
      timestamp: new Date().toISOString(),
    });

    return { message: `User with id ${id} has been deleted.` };
  }
}
