import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TReqCartItem } from 'types/request_types';
import { ProductValidation } from './product.validation';
import { TResponeCommon } from 'types/response_types';
import { ResCommonCode } from 'types/enum';

@Injectable()
export class CartValidation {
  constructor(
    private prisma: PrismaService,
    private productValidation: ProductValidation,
  ) {}

  async checkBeforeAddToCart(
    dto: TReqCartItem,
  ): Promise<true | TResponeCommon> {
    try {
      if (!(await this.checkCartIsExist(dto.cart_id))) {
        return {
          res_code: ResCommonCode.DATA_NOT_EXIST,
          res_message: 'cart_id không tồn tại',
        };
      }

      if (
        !(await this.productValidation.checkProductExist({
          id: dto.product_id,
        }))
      ) {
        return {
          res_code: ResCommonCode.DATA_NOT_EXIST,
          res_message: 'product_id không tồn tại',
        };
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  async checkCartItemIsExist(dto: TReqCartItem): Promise<boolean> {
    try {
      const cartItem = await this.prisma.cartItem.findFirst({
        where: {
          cart_id: dto.cart_id,
          product_id: dto.product_id,
        },
      });
      if (!cartItem) {
        return false;
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
  async checkCartIsExist(id: number): Promise<boolean> {
    try {
      const cart = await this.prisma.cart.findUnique({
        where: {
          id,
        },
      });
      if (!cart) {
        return false;
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
}
