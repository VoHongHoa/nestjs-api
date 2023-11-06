import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomerValidation {
  constructor(private prisma: PrismaService) {}

  async checkCustomerIsExistByPhoneNumber(
    phone_number: string,
  ): Promise<boolean> {
    try {
      const existCustomer = await this.prisma.customer.findUnique({
        where: {
          phone_number: phone_number,
        },
      });
      if (existCustomer !== null) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  async checkCustomerIsExistById(id: number): Promise<boolean> {
    try {
      const existCustomer = await this.prisma.customer.findUnique({
        where: {
          id,
        },
      });
      if (existCustomer !== null) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  async checkCustomerIsExistByEmail(email: string): Promise<boolean> {
    try {
      const existCustomer = await this.prisma.customer.findUnique({
        where: {
          email,
        },
      });
      if (existCustomer !== null) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }
}
