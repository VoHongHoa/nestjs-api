import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImageDto } from './dto';
import { ImageValidation } from 'src/validation/image.validation';
import { TResponeCommon } from 'types/response_types';
import {
  TImageResponseCreate,
  TImageResponseData,
} from 'types/response_types/image_type';
import { ResCommonCode } from 'types/enum';

@Injectable()
export class ImageService {
  constructor(
    private prisma: PrismaService,
    private imagevalidation: ImageValidation,
  ) {}

  async create(dto: ImageDto): Promise<TResponeCommon | TImageResponseCreate> {
    try {
      const checkDataBeforCreate: true | TResponeCommon =
        await this.imagevalidation.checkBeforeCreate(dto);
      if (checkDataBeforCreate !== true) {
        return checkDataBeforCreate;
      }
      const image: TImageResponseCreate = await this.prisma.image.create({
        data: {
          url: dto.url,
          product_id: dto.product_id,
        },
      });
      return image;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const removeResult: TImageResponseData = await this.prisma.image.delete({
        where: {
          id,
        },
      });
      return {
        res_code: ResCommonCode.SUCCESS,
        res_message: '1 dữ liệu thành công',
      };
    } catch (error) {
      throw error;
    }
  }
}
