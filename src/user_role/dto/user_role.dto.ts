import { IsNotEmpty, IsString } from 'class-validator';

export class UserRoleDto {
  @IsNotEmpty()
  @IsString()
  role_code: string;

  @IsNotEmpty()
  @IsString()
  role_name: string;
}
