import { Injectable } from '@nestjs/common';
import { TReqImageCreateData } from 'types/request_types';
import { ProductValidation } from './product.validation';
import { ResCommonCode } from 'types/enum';

@Injectable()
export class ImageValidation {
  constructor(private productValidation: ProductValidation) {}

  async checkBeforeCreate(dto: TReqImageCreateData) {
    try {
      if (
        !(await this.productValidation.checkProductExist({
          id: dto.product_id,
        }))
      ) {
        return {
          res_code: ResCommonCode.DATA_NOT_EXIST,
          res_message: 'product_code không tồn tại',
        };
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
}
