import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageDto } from './dto';
import { TResponeCommon } from 'types/response_types';
import { TImageResponseCreate } from 'types/response_types/image_type';

@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Post()
  async create(
    @Body() dto: ImageDto,
  ): Promise<TResponeCommon | TImageResponseCreate> {
    return this.imageService.create(dto);
  }
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.imageService.remove(id);
  }
}
