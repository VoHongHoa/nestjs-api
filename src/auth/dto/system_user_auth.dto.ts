import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SystemUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  user_code: string;
  @IsNotEmpty()
  password: string;
}

export class SystemUserLogInDto {
  @IsString()
  @IsNotEmpty()
  system_user_code: string;
  @IsString()
  @IsNotEmpty()
  system_user_password: string;
}
