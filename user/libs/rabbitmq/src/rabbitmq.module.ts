import { Module, DynamicModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import RabbitmqModuleTokens from '@app/rabbitmq/rabbitmq.module.tokens';

@Module({})
export class RabbitmqModule {
  static register(): DynamicModule {
    return {
      module: RabbitmqModule,
      imports: [
        ConfigModule,
        ClientsModule.registerAsync([
          {
            name: RabbitmqModuleTokens.RabbitmqService,
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [configService.get<string>('RABBITMQ_URL') || 'amqp://rabbitmq:5672'],
                queue: configService.get<string>('RABBITMQ_QUEUE') || 'user-notification',
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
