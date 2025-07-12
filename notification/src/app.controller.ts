import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/health')
  public getHealthCheck() {
    return { ok: true };
  }

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
