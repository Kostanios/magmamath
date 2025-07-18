import { IsEmail, IsNotEmpty, IsString } from 'class-validator';


export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
