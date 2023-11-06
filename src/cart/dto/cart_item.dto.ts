import { IsNotEmpty, IsNumber } from 'class-validator';

export class CartItemDto {
  @IsNumber()
  @IsNotEmpty()
  cart_id: number;
  @IsNumber()
  @IsNotEmpty()
  product_id: number;
  quantity: number;
}
