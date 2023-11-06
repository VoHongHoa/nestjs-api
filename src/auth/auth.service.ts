import { Injectable } from '@nestjs/common';
import { CustomerDto, CustomerSignInDto, SystemUserLogInDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import {
  TCustomerLoginResponseData,
  TCustomerResponseCreate,
  TResponeCommon,
  TSystemUserLoginResponseData,
} from 'types/response_types';
import { CustomerValidation } from 'src/validation/customer.validation';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  TCustomerJwtPayload,
  TSystemUserJwtPayload,
} from 'types/common_type/jwt_payload.type';
import { ResCommonCode } from 'types/enum';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private customerValidation: CustomerValidation,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async customerSignup(
    dto: CustomerDto,
  ): Promise<TCustomerResponseCreate | TResponeCommon> {
    try {
      if (
        await this.customerValidation.checkCustomerIsExistByPhoneNumber(
          dto.phone_number,
        )
      ) {
        return {
          res_code: ResCommonCode.DATA_EXIST,
          res_message: 'phone_number đã tồn tại',
        };
      }
      if (
        await this.customerValidation.checkCustomerIsExistByEmail(dto.email)
      ) {
        return {
          res_code: ResCommonCode.DATA_NOT_EXIST,
          res_message: 'email đã tồn tại',
        };
      }
      const salt: string = await bcrypt.genSalt();
      const hashPassword: string = await bcrypt.hash(dto.password, salt);

      const customer = (await this.prisma.customer.create({
        data: {
          email: dto.email,
          password: hashPassword,
          address: dto.address,
          avatar: dto.avatar,
          customer_name: dto.customer_name,
          display_name: dto.display_name,
          phone_number: dto.phone_number,
        },
        select: {
          id: true,
          email: true,
          phone_number: true,
        },
      })) as TCustomerResponseCreate;
      await this.prisma.cart.create({
        data: {
          customer_id: customer.id,
        },
      });
      return customer;
    } catch (error) {
      throw error;
    }
  }

  async customerSignIn(
    dto: CustomerSignInDto,
  ): Promise<TCustomerLoginResponseData | TResponeCommon> {
    try {
      const customer = await this.prisma.customer.findUnique({
        where: {
          email: dto.email,
        },
      });
      if (!customer) {
        return {
          res_code: ResCommonCode.DATA_NOT_EXIST,
          res_message: 'email đã tồn tại',
        };
      }
      const comparedPassword = await bcrypt.compare(
        dto.password,
        customer.password,
      );
      if (!comparedPassword) {
        return {
          res_code: ResCommonCode.DATA_INCORECT,
          res_message: 'password không chính xác',
        };
      }
      const accessToken = await this.signCustomerToken({
        id: customer.id,
        email: customer.email,
      });
      delete customer.password;
      return {
        customer: customer,
        access_token: accessToken,
      };
    } catch (error) {
      throw error;
    }
  }

  async systemUserSignIn(
    dto: SystemUserLogInDto,
  ): Promise<TSystemUserLoginResponseData | TResponeCommon> {
    try {
      const user = await this.prisma.systemUser.findUnique({
        where: {
          system_user_code: dto.system_user_code,
        },
      });
      if (!user) {
        return {
          res_code: ResCommonCode.DATA_INCORECT,
          res_message: 'system_user_code không chính xác',
        };
      }
      const comparedPassword = await bcrypt.compare(
        dto.system_user_password,
        user.system_user_password,
      );
      if (!comparedPassword) {
        return {
          res_code: ResCommonCode.DATA_INCORECT,
          res_message: 'password không chính xác',
        };
      }
      const accessToken = await this.signSystemUserToken({
        id: user.id,
        system_user_code: user.system_user_code,
      });
      delete user.system_user_password;
      return {
        user,
        access_token: accessToken,
      };
    } catch (error) {
      throw error;
    }
  }

  async signCustomerToken(payload: TCustomerJwtPayload): Promise<string> {
    const secret = this.config.get('CUSTOMER_JWT_SECRET');
    const accessToken: string = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });

    return accessToken;
  }

  async signSystemUserToken(payload: TSystemUserJwtPayload): Promise<string> {
    const secret = this.config.get('SYSTEM_USER_JWT_SECRET');
    const accessToken: string = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
    return accessToken;
  }
}
