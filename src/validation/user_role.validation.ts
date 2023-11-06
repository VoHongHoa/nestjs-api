import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRoleValidation {
  constructor(private prisma: PrismaService) {}

  async checkUserRoleIsExist(roleCode: string): Promise<boolean> {
    try {
      const existUserRole = await this.prisma.userRole.findUnique({
        where: {
          role_code: roleCode,
        },
      });
      if (existUserRole !== null) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  async checkUserRoleIsExistById(id: number): Promise<boolean> {
    try {
      const existUserRole = await this.prisma.userRole.findUnique({
        where: {
          id,
        },
      });
      if (existUserRole !== null) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  async checkUserRoleIsExist1(
    id?: number,
    role_code?: string,
  ): Promise<boolean> {
    try {
      const existUserRole = await this.prisma.userRole.findUnique({
        where: {
          id,
          role_code,
        },
      });
      if (existUserRole !== null) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }
}
