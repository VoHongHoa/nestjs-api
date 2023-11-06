import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TResponeCommon } from 'types/response_types';
import { UserRoleValidation } from './user_role.validation';
import {
  TReqSystemUserCreateData,
  TReqSystemUserUpdateData,
} from 'types/request_types';
import { ResCommonCode } from 'types/enum';
@Injectable()
export class SystemUserValidation {
  constructor(
    private prisma: PrismaService,
    private userRoleValidation: UserRoleValidation,
  ) {}

  async checkBeforeUpdate(
    dto: TReqSystemUserUpdateData,
    id?: number,
  ): Promise<boolean | TResponeCommon> {
    try {
      if (id && !(await this.checkSystemUserIsExistById(id))) {
        return {
          res_code: ResCommonCode.DATA_NOT_EXIST,
          res_message: 'system_user_id không tồn tại',
        };
      }
      if (
        !(await this.userRoleValidation.checkUserRoleIsExistById(dto.role_id))
      ) {
        return {
          res_code: ResCommonCode.DATA_NOT_EXIST,
          res_message: 'role_id không tồn tại',
        };
      }
      if (await this.checkSystemUserIsExistByEmail(dto.system_user_email, id)) {
        return {
          res_code: ResCommonCode.DATA_EXIST,
          res_message: 'system_user_email đã tồn tại',
        };
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
  async checkBeforeCreate(
    dto: TReqSystemUserCreateData,
    id?: number,
  ): Promise<boolean | TResponeCommon> {
    try {
      if (await this.checkSystemUserIsExistByCode(dto.system_user_code)) {
        return {
          res_code: ResCommonCode.DATA_EXIST,
          res_message: 'system_user_code đã tồn tại',
        };
      }
      if (
        !(await this.userRoleValidation.checkUserRoleIsExistById(dto.role_id))
      ) {
        return {
          res_code: ResCommonCode.DATA_NOT_EXIST,
          res_message: 'role_id không tồn tại',
        };
      }
      if (await this.checkSystemUserIsExistByEmail(dto.system_user_email, id)) {
        return {
          res_code: ResCommonCode.DATA_EXIST,
          res_message: 'email đã tồn tại',
        };
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  async checkSystemUserIsExistByCode(
    system_user_code: string,
    id?: number,
  ): Promise<boolean> {
    try {
      const existUser = await this.prisma.systemUser.findUnique({
        where: {
          system_user_code,
        },
      });
      if (existUser !== null) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }
  async checkSystemUserIsExistById(id: number): Promise<boolean> {
    try {
      const existUser = await this.prisma.systemUser.findUnique({
        where: {
          id,
        },
      });
      if (existUser !== null) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  async checkSystemUserIsExistByEmail(
    system_user_email: string,
    id?: number,
  ): Promise<boolean> {
    try {
      const existUser = await this.prisma.systemUser.findUnique({
        where: {
          system_user_email,
        },
      });
      if (existUser !== null && existUser.id !== id) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }
}
