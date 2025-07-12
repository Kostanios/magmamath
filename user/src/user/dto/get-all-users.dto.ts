import { IsNumberString } from 'class-validator';


export class GetAllUsersDto {
  @IsNumberString()
  page: string;

  @IsNumberString()
  limit: string;
}
