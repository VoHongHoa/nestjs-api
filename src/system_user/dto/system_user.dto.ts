import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class SystemUserDto {
  @IsNotEmpty()
  @IsString()
  system_user_code: string;

  @IsNotEmpty()
  @IsEmail()
  system_user_email: string;

  @IsString()
  system_user_display_name: string;

  @IsNotEmpty()
  @IsInt()
  role_id: number;

  @IsNotEmpty()
  system_user_password: string;
}
