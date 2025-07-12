import { Inject } from '@nestjs/common';
import userModuleTokens from '../user.module.tokens';

export const InjectUserEntityMapper = () => {
  return Inject(userModuleTokens.UserEntityMapper)
}
