import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Get,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartItemDto } from './dto';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  async addToCart(@Body() dto: CartItemDto) {
    return this.cartService.addToCart(dto);
  }

  @Get(':id')
  async getCartInformation(@Param('id', ParseIntPipe) id: number) {
    return this.cartService.getCartInformation(id);
  }

  @Patch('increase/:id')
  async increase(@Param('id', ParseIntPipe) id: number) {
    return this.cartService.increaseQuantity(id);
  }

  @Patch('decrease/:id')
  async decrease(@Param('id', ParseIntPipe) id: number) {
    return this.cartService.descreaseQuantity(id);
  }

  @Patch('quantity/:id')
  async changeQuantity(
    @Body('quantity', ParseIntPipe) quantity: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.cartService.changeQuantity(id, quantity);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.cartService.removeItem(id);
  }
}
