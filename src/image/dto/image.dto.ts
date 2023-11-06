import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ImageDto {
  @IsString()
  @IsNotEmpty()
  url: string;
  @IsNotEmpty()
  @IsNumber()
  product_id: number;
}
