import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  @IsString()
  product_code: string;
  @IsNotEmpty()
  @IsString()
  product_name: string;
  @IsNotEmpty()
  category_id: number;
  @IsString()
  product_price: string;
  @IsString()
  product_decscription: string;
  @IsString()
  product_information: string;
  @IsString()
  product_tag: string;
}
