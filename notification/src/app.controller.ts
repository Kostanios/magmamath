import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class AppController {
  @EventPattern('user-created')
  public async handleUserCreatedNotification(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    Logger.log('Received user notification:', data);
  }

  @EventPattern('user-deleted')
  public async handleUserDeletedNotification(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    Logger.log('Received user notification:', data);
  }
}
