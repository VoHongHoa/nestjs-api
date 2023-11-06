import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TDataCheck } from 'types/common_type';
import { ResCommonCode } from 'types/enum';
import {
  TReqCategoryCreateData,
  TReqCategoryUpdateData,
} from 'types/request_types';
import { TResponeCommon } from 'types/response_types';

@Injectable()
export class CategoryValidation {
  constructor(private prisma: PrismaService) {}

  async checkBeforUpdate(
    dto: TReqCategoryUpdateData,
    id: number,
  ): Promise<true | TResponeCommon> {
    try {
      if (!(await this.checkCategoryExist({ code: dto.category_code, id }))) {
        return {
          res_code: ResCommonCode.DATA_NOT_EXIST,
          res_message: 'id hoặc category_code đã tồn tại',
        };
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  async checkBeforeCreate(
    dto: TReqCategoryCreateData,
  ): Promise<true | TResponeCommon> {
    try {
      if (await this.checkCategoryExist({ code: dto.category_code })) {
        return {
          res_code: ResCommonCode.DATA_EXIST,
          res_message: 'category_code đã tồn tại',
        };
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
  async checkCategoryExist(data: TDataCheck): Promise<boolean> {
    try {
      const existCategories = await this.prisma.category.findUnique({
        where: {
          id: data.id,
          category_code: data.code,
        },
      });
      if (existCategories !== null) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }
}
