import userModuleTokens from '../user.module.tokens';
import { Inject } from '@nestjs/common';

export const InjectUserRepository = () => {
  return Inject(userModuleTokens.UserRepository)
};
