import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import {
  TProductResponseCreate,
  TProductResponseData,
  TResponeCommon,
} from 'types/response_types';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async create(
    @Body() dto: ProductDto,
  ): Promise<TResponeCommon | TProductResponseCreate> {
    return this.productService.create(dto);
  }
  @Get()
  async getAll(): Promise<TProductResponseData[]> {
    return this.productService.getAll();
  }
  @Get('active')
  async getAllActive(): Promise<TProductResponseData[]> {
    return this.productService.getAllActive();
  }
  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TProductResponseData> {
    return this.productService.getById(id);
  }
  @Put(':id')
  async update(@Body() dto: ProductDto, @Param('id', ParseIntPipe) id: number) {
    return this.productService.update(dto, id);
  }
  @Delete()
  async remove(@Body('ids') ids: number[]): Promise<TResponeCommon> {
    return this.productService.remove(ids);
  }
}
