import { Inject } from '@nestjs/common';
import RabbitmqModuleTokens from '@app/rabbitmq/rabbitmq.module.tokens';

export const InjectRabbitmqService = () => {
  return Inject(RabbitmqModuleTokens.RabbitmqService);
};
