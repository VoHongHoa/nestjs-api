import { Injectable } from '@nestjs/common';
import { SystemUserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SystemUserValidation } from 'src/validation/system_user.validation';
import * as bcrypt from 'bcrypt';
import { TResponeCommon, TSystemUserResponseData } from 'types/response_types';
import {
  TReqSystemUserCreateData,
  TReqSystemUserUpdateData,
} from 'types/request_types';
@Injectable()
export class SystemUserService {
  constructor(
    private prisma: PrismaService,
    private systemUserValidation: SystemUserValidation,
  ) {}

  async update(
    id: number,
    dto: SystemUserDto,
  ): Promise<TSystemUserResponseData | TResponeCommon> {
    try {
      const dataUpdate: TReqSystemUserUpdateData = {
        system_user_display_name: dto.system_user_display_name,
        system_user_email: dto.system_user_email,
        role_id: dto.role_id,
      };
      const checkDataResult = await this.systemUserValidation.checkBeforeUpdate(
        dataUpdate,
        id,
      );
      if (typeof checkDataResult !== 'boolean') {
        return checkDataResult;
      }
      const resultUpdated: TSystemUserResponseData =
        await this.prisma.systemUser.update({
          where: {
            id,
          },
          data: dataUpdate,
        });
      return resultUpdated;
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<TSystemUserResponseData[]> {
    try {
      const users = await this.prisma.systemUser.findMany({
        include: {
          role: {
            select: {
              role_code: true,
              role_name: true,
            },
          },
        },
      });
      return users;
    } catch (error) {
      throw error;
    }
  }
  async create(
    dto: SystemUserDto,
  ): Promise<TSystemUserResponseData | TResponeCommon> {
    try {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(dto.system_user_password, salt);
      const dataCreate: TReqSystemUserCreateData = {
        system_user_email: dto.system_user_email,
        system_user_display_name: dto.system_user_display_name,
        system_user_code: dto.system_user_code,
        role_id: dto.role_id,
        system_user_password: hashPassword,
      };
      const checkDataResult: boolean | TResponeCommon =
        await this.systemUserValidation.checkBeforeCreate(dataCreate);
      if (typeof checkDataResult !== 'boolean') {
        return checkDataResult;
      }
      const user = await this.prisma.systemUser.create({
        data: dataCreate,
      });
      delete user.system_user_password;
      return user;
    } catch (error) {
      throw error;
    }
  }
}
