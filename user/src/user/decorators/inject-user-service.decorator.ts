import { Inject } from '@nestjs/common';
import userModuleTokens from '../user.module.tokens';

export const InjectUserService = () => {
  return Inject(userModuleTokens.UserService);
};

