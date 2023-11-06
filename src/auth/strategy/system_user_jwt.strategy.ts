import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { TSystemUserJwtPayload } from 'types/common_type';
import { TSystemUserResponseData } from 'types/response_types';

@Injectable()
export class SystemUserJwtStrategy extends PassportStrategy(
  Strategy,
  'system_user_jwt',
) {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('SYSTEM_USER_JWT_SECRET'),
    });
  }
  async validate(
    payload: TSystemUserJwtPayload,
  ): Promise<TSystemUserResponseData> {
    const systemUser = await this.prisma.systemUser.findUnique({
      where: {
        id: payload.id,
        system_user_code: payload.system_user_code,
      },
      include: {
        role: {
          select: {
            role_code: true,
            role_name: true,
          },
        },
      },
    });
    delete systemUser.system_user_password;
    return systemUser;
  }
}
