import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartValidation } from 'src/validation/cart.validation';
import { ProductValidation } from 'src/validation/product.validation';
import { ResCommonCode } from 'types/enum';
import { TReqCartItem } from 'types/request_types';

@Injectable()
export class CartService {
  constructor(
    private prisma: PrismaService,
    private cartValidation: CartValidation,
    private productValidation: ProductValidation,
  ) {}

  async getCartInformation(cart_id: number) {
    try {
      const cart = await this.prisma.cart.findUnique({
        where: {
          id: cart_id,
        },
        include: {
          cart_item: {
            where: {
              cart_id,
            },
            include: {
              product: true,
            },
          },
        },
      });
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async addToCart(dto: TReqCartItem) {
    try {
      const checkCartResult = await this.cartValidation.checkCartIsExist(
        dto.cart_id,
      );

      if (checkCartResult !== true) {
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

      const existCartItem = await this.prisma.cartItem.findFirst({
        where: {
          cart_id: dto.cart_id,
          product_id: dto.product_id,
        },
      });
      if (!existCartItem) {
        await this.prisma.cartItem.create({
          data: {
            cart_id: dto.cart_id,
            product_id: dto.product_id,
            quantity: 1,
          },
          include: {
            product: {
              select: {
                product_code: true,
                product_price: true,
                product_name: true,
              },
            },
          },
        });
      } else {
        await this.prisma.cartItem.update({
          where: {
            id: existCartItem.id,
          },
          data: {
            quantity: existCartItem.quantity + 1,
          },
          include: {
            product: {
              select: {
                product_code: true,
                product_price: true,
                product_name: true,
              },
            },
          },
        });
      }

      return this.caculateTotalPrice(dto.cart_id);
    } catch (error) {
      throw error;
    }
  }

  async caculateTotalPrice(cart_id: number) {
    try {
      const allItem = await this.prisma.cartItem.findMany({
        where: {
          cart_id,
        },
        include: {
          product: {
            select: {
              id: true,
              product_price: true,
            },
          },
        },
      });
      let total_cost = 0;
      let total_quantity = 0;
      allItem.forEach((item) => {
        total_cost += parseInt(item.product.product_price) * item.quantity;
        total_quantity += item.quantity;
      });
      const updateCart = await this.prisma.cart.update({
        where: {
          id: cart_id,
        },
        data: {
          total_cost: total_cost,
          total_quantity: total_quantity,
        },
      });
      return updateCart;
    } catch (error) {
      throw error;
    }
  }

  async increaseQuantity(id: number) {
    try {
      const existCartItem = await this.prisma.cartItem.findUnique({
        where: {
          id,
        },
      });

      if (!existCartItem) {
        return {
          res_code: ResCommonCode.DATA_NOT_EXIST,
          res_message: 'cart_item_id đã tồn tại',
        };
      }

      await this.prisma.cartItem.update({
        where: {
          id,
        },
        data: {
          quantity: existCartItem.quantity + 1,
        },
      });
      return this.caculateTotalPrice(existCartItem.cart_id);
    } catch (error) {
      throw error;
    }
  }

  async descreaseQuantity(id: number) {
    try {
      const existCartItem = await this.prisma.cartItem.findUnique({
        where: {
          id,
        },
      });
      if (!existCartItem) {
        return {
          res_code: ResCommonCode.DATA_NOT_EXIST,
          res_message: 'cart_item_id đã tồn tại',
        };
      }
      if (existCartItem.quantity > 1) {
        await this.prisma.cartItem.update({
          where: {
            id,
          },
          data: {
            quantity: existCartItem.quantity - 1,
          },
        });
      } else {
        await this.prisma.cartItem.delete({
          where: {
            id,
          },
        });
      }
      return this.caculateTotalPrice(existCartItem.cart_id);
    } catch (error) {
      throw error;
    }
  }

  async changeQuantity(id: number, quantity: number) {
    try {
      const existCartItem = await this.prisma.cartItem.findUnique({
        where: {
          id,
        },
      });
      if (!existCartItem) {
        return {
          res_code: ResCommonCode.DATA_NOT_EXIST,
          res_message: 'cart_item_id đã tồn tại',
        };
      }
      await this.prisma.cartItem.update({
        where: {
          id,
        },
        data: {
          quantity,
        },
      });

      return this.caculateTotalPrice(existCartItem.cart_id);
    } catch (error) {
      throw error;
    }
  }

  async removeItem(id: number) {
    try {
      const existCartItem = await this.prisma.cartItem.findUnique({
        where: {
          id,
        },
      });
      if (!existCartItem) {
        return {
          res_code: ResCommonCode.DATA_NOT_EXIST,
          res_message: 'cart_item_id đã tồn tại',
        };
      }
      await this.prisma.cartItem.delete({
        where: {
          id,
        },
      });
      return {
        res_code: ResCommonCode.SUCCESS,
        res_message: 'Xóa dữ liệu thành công',
      };
    } catch (error) {
      throw error;
    }
  }
}
