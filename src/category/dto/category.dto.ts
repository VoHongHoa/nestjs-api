import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  @IsString()
  category_name: string;
  @IsNotEmpty()
  @IsString()
  category_code: string;
  @IsString()
  image: string;
}
