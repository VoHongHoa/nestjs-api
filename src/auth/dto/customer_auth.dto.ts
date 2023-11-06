import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  isNotEmpty,
} from 'class-validator';

export class CustomerDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  display_name: string;
  customer_name: string;
  address: string;
  @IsNotEmpty()
  phone_number: string;
  status?: boolean;
  avatar: string;
}

export class CustomerSignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
