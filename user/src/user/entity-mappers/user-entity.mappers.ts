import { UserEntity } from '../entity';
import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto';

export interface UserEntityToDtoMapper {
  mapOne(entity: UserEntity): UserDto;
  mapMany(entities: UserEntity[]): UserDto[];
}

@Injectable()
export class DefaultUserEntityToDtoMapper implements UserEntityToDtoMapper {
  public mapOne(entity: UserEntity): UserDto {
    return {
      id: entity.id,
      email: entity.email,
      name: entity.name,
      createdAt: entity.createdAt,
    };
  }

  public mapMany(entities: UserEntity[]): UserDto[] {
    return entities.map((entity) => this.mapOne(entity));
  }
}
