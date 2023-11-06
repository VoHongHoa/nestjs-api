import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  TReqProductCreateData,
  TReqProductUpdateData,
} from 'types/request_types';
import { TResponeCommon } from 'types/response_types';
import { CategoryValidation } from './category.validation';
import { TDataCheck } from 'types/common_type';
import { ResCommonCode } from 'types/enum';

@Injectable()
export class ProductValidation {
  constructor(
    private prisma: PrismaService,
    private categoryValidation: CategoryValidation,
  ) {}

  async checkBeforUpdate(
    dto: TReqProductUpdateData,
    id: number,
  ): Promise<true | TResponeCommon> {
    try {
      if (!(await this.checkProductExist({ id, code: dto.product_code }))) {
        const response: TResponeCommon = {
          res_code: ResCommonCode.DATA_NOT_EXIST,
        };
        return response;
      }
      if (
        !(await this.categoryValidation.checkCategoryExist({
          id: dto.category_id,
        }))
      ) {
        return {
          res_code: ResCommonCode.DATA_EXIST,
          res_message: 'category_id không tồn tại',
        };
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  async checkBeforeCreate(
    dto: TReqProductCreateData,
  ): Promise<true | TResponeCommon> {
    try {
      if (await this.checkProductExist({ code: dto.product_code })) {
        return {
          res_code: ResCommonCode.DATA_EXIST,
          res_message: 'product_code đã tồn tại',
        };
      }
      if (
        !(await this.categoryValidation.checkCategoryExist({
          id: dto.category_id,
        }))
      ) {
        return {
          res_code: ResCommonCode.DATA_NOT_EXIST,
          res_message: 'category_id không tồn tại',
        };
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  async checkProductExist(data: TDataCheck): Promise<boolean> {
    try {
      const existProduct = await this.prisma.product.findUnique({
        where: {
          id: data.id,
          product_code: data.code,
        },
      });
      if (existProduct !== null) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }
}
