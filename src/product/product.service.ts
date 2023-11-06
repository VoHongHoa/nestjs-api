import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductValidation } from 'src/validation/product.validation';
import { ResCommonCode } from 'types/enum';
import {
  TReqProductCreateData,
  TReqProductUpdateData,
} from 'types/request_types';
import {
  TProductResponseCreate,
  TProductResponseData,
  TResponeCommon,
} from 'types/response_types';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private productValidation: ProductValidation,
  ) {}

  async remove(ids: number[]): Promise<TResponeCommon> {
    try {
      const result: Prisma.BatchPayload = await this.prisma.product.deleteMany({
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
    dto: TReqProductUpdateData,
    id: number,
  ): Promise<TResponeCommon | TProductResponseData> {
    try {
      const checkUpdateResult: true | TResponeCommon =
        await this.productValidation.checkBeforUpdate(dto, id);
      if (checkUpdateResult !== true) {
        return checkUpdateResult;
      }

      const product: TProductResponseData = await this.prisma.product.update({
        where: {
          id: id,
          product_code: dto.product_code,
        },
        data: {
          product_decscription: dto.product_decscription,
          product_information: dto.product_information,
          product_name: dto.product_name,
          product_price: dto.product_price,
          category_id: dto.category_id,
          product_tag: dto.product_tag,
        },
      });

      return product;
    } catch (error) {
      throw error;
    }
  }

  async getById(id: number): Promise<TProductResponseData> {
    try {
      const product: TProductResponseData =
        await this.prisma.product.findUnique({
          where: {
            id,
          },
          include: {
            image: {
              select: {
                url: true,
              },
            },
          },
        });
      return product;
    } catch (error) {
      throw error;
    }
  }

  async getAllActive(): Promise<TProductResponseData[]> {
    try {
      const products: TProductResponseData[] =
        await this.prisma.product.findMany({
          where: {
            status: true,
          },
          include: {
            image: {
              select: {
                url: true,
              },
            },
            category: {
              select: {
                category_name: true,
                category_code: true,
                id: true,
              },
            },
          },
        });
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<TProductResponseData[]> {
    try {
      const products: TProductResponseData[] =
        await this.prisma.product.findMany({
          include: {
            image: {
              select: {
                url: true,
              },
            },
            category: {
              select: {
                category_name: true,
                category_code: true,
                id: true,
              },
            },
          },
        });
      return products;
    } catch (error) {
      throw error;
    }
  }

  async create(
    dto: TReqProductCreateData,
  ): Promise<TResponeCommon | TProductResponseCreate> {
    try {
      const checkDataResult: true | TResponeCommon =
        await this.productValidation.checkBeforeCreate(dto);
      if (checkDataResult !== true) {
        return checkDataResult;
      }
      const category = await this.prisma.product.create({
        data: {
          product_code: dto.product_code,
          product_name: dto.product_name,
          product_decscription: dto.product_decscription,
          product_information: dto.product_information,
          product_price: dto.product_price,
          product_tag: dto.product_tag,
          category_id: dto.category_id,
        },
        select: {
          id: true,
          product_code: true,
          product_name: true,
          category_id: true,
        },
      });
      return category;
    } catch (error) {
      throw error;
    }
  }
}
