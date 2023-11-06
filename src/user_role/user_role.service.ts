import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRoleDto } from './dto';
import { UserRoleValidation } from 'src/validation/user_role.validation';
import { ResCommonCode } from 'types/enum';
@Injectable()
export class UserRoleService {
  constructor(
    private prisma: PrismaService,
    private userRoleValidation: UserRoleValidation,
  ) {}

  async removeData(ids: number[]) {
    try {
      const result = await this.prisma.userRole.deleteMany({
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

  async update(id: number, dto: UserRoleDto) {
    try {
      if (await this.userRoleValidation.checkUserRoleIsExist(dto.role_code)) {
        const resultUpdated = await this.prisma.userRole.update({
          where: {
            id,
            role_code: dto.role_code,
          },
          data: {
            role_name: dto.role_name,
          },
        });
        return resultUpdated;
      }

      return {
        res_code: ResCommonCode.DATA_NOT_EXIST,
        res_message: 'role_id không tồn tại',
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllActive() {
    try {
      const userRoles = await this.prisma.userRole.findMany({
        where: {
          status: true,
        },
      });
      return userRoles;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const userRoles = await this.prisma.userRole.findMany();
      return userRoles;
    } catch (error) {
      throw error;
    }
  }

  async create(dto: UserRoleDto) {
    try {
      if (await this.userRoleValidation.checkUserRoleIsExist(dto.role_code)) {
        return {
          res_code: ResCommonCode.DATA_EXIST,
          res_message: 'role_code đã tồn tại',
        };
      }
      const userRole = await this.prisma.userRole.create({
        data: {
          role_code: dto.role_code,
          role_name: dto.role_name,
        },
      });
      return userRole;
    } catch (error) {
      throw error;
    }
  }
}
