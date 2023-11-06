import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto';
import {
  TCategoryResponseCreate,
  TCategoryResponseData,
  TResponeCommon,
} from 'types/response_types';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Post()
  create(
    @Body() dto: CategoryDto,
  ): Promise<TResponeCommon | TCategoryResponseCreate> {
    return this.categoryService.create(dto);
  }
  @Get()
  getAll(): Promise<TCategoryResponseData[]> {
    return this.categoryService.getAll();
  }

  @Get(':id')
  getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TCategoryResponseData> {
    return this.categoryService.getById(id);
  }

  @Put(':id')
  update(@Body() dto: CategoryDto, @Param('id', ParseIntPipe) id: number) {
    return this.categoryService.update(dto, id);
  }
  @Delete()
  remove(@Body('ids') ids: number[]) {
    return this.categoryService.remove(ids);
  }
}
