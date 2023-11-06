import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto } from './dto';
import { CategoryValidation } from 'src/validation/category.validation';
import {
  TCategoryResponseCreate,
  TCategoryResponseData,
  TResponeCommon,
} from 'types/response_types';
import { TReqCategoryUpdateData } from 'types/request_types';
import { ResCommonCode } from 'types/enum';

@Injectable()
export class CategoryService {
  constructor(
    private prisma: PrismaService,
    private categoryValidation: CategoryValidation,
  ) {}

  async remove(ids: number[]): Promise<TResponeCommon> {
    try {
      const result = await this.prisma.category.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
      const message: string = `${result.count}`;
      return {
        res_code: ResCommonCode.SUCCESS,
        res_message: message + 'dữ liệu thành công',
      };
    } catch (error) {
      throw error;
    }
  }

  async update(
    dto: TReqCategoryUpdateData,
    id: number,
  ): Promise<TResponeCommon | TCategoryResponseData> {
    try {
      const checkDataUpdateResult =
        await this.categoryValidation.checkBeforUpdate(dto, id);
      if (checkDataUpdateResult !== true) {
        return checkDataUpdateResult;
      }
      const category = await this.prisma.category.update({
        data: {
          category_name: dto.category_name,
          image: dto.image,
        },
        where: {
          id,
        },
      });
      return category;
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<TCategoryResponseData[]> {
    try {
      const categories = await this.prisma.category.findMany();
      return categories;
    } catch (error) {
      throw error;
    }
  }

  async getById(id: number): Promise<TCategoryResponseData> {
    try {
      const category = await this.prisma.category.findUnique({
        where: {
          id,
        },
      });
      return category;
    } catch (error) {
      throw error;
    }
  }

  async create(
    dto: CategoryDto,
  ): Promise<TResponeCommon | TCategoryResponseCreate> {
    try {
      const checkDataResult: boolean | TResponeCommon =
        await this.categoryValidation.checkBeforeCreate(dto);
      if (checkDataResult !== true) {
        return checkDataResult;
      }
      const category: TCategoryResponseCreate =
        await this.prisma.category.create({
          data: {
            category_code: dto.category_code,
            category_name: dto.category_name,
          },
          select: {
            id: true,
            category_code: true,
            category_name: true,
            image: true,
          },
        });
      return category;
    } catch (error) {
      throw error;
    }
  }
}
