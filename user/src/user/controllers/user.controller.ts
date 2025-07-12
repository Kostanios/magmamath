import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { InjectUserService } from '../decorators';
import { IUserService } from '../services';
import { CreateUserDto, GetAllUsersDto, UpdateUserDto } from '../dto';

@Controller('users')
export class UserController {
  constructor(@InjectUserService() private readonly userService: IUserService) {}

  @Get()
  public getUsers(@Query() query: GetAllUsersDto) {
    return this.userService.getUsers(query);
  }

  @Patch('/:id')
  public async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(id, body);
  }

  @Post()
  public async createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Delete('/:id')
  public async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
