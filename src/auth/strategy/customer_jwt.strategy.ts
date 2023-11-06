import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { TCustomerJwtPayload } from 'types/common_type';

@Injectable()
export class CustomerJwtStrategy extends PassportStrategy(
  Strategy,
  'customer_jwt',
) {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('CUSTOMER_JWT_SECRET'),
    });
  }
  async validate(payload: TCustomerJwtPayload) {
    const customer = await this.prisma.customer.findUnique({
      where: {
        id: payload.id,
      },
    });
    delete customer.password;
    return customer;
  }
}
