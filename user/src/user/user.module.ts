import { Module } from '@nestjs/common';
import { UserController } from './controllers';
import { UserService } from './services';
import userModuleTokens from './user.module.tokens';
import { RabbitmqModule } from '@app/rabbitmq';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas';
import { MongoUserRepository } from './repositories';
import { DefaultUserEntityToDtoMapper } from './entity-mappers';

@Module({
  imports: [
    RabbitmqModule.register(),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ])
  ],
  controllers: [UserController],
  providers: [
    {
      provide: userModuleTokens.UserRepository,
      useClass: MongoUserRepository,
    },
    {
      provide: userModuleTokens.UserService,
      useClass: UserService
    },
    {
      provide: userModuleTokens.UserEntityMapper,
      useClass: DefaultUserEntityToDtoMapper,
    }
  ],
  exports: [],
})
export class UserModule {}
