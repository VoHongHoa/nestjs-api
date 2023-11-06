import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CustomerModule } from './customer/customer.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserRoleModule } from './user_role/user_role.module';
import { ValidationModule } from './validation/validation.module';
import { SystemUserModule } from './system_user/system_user.module';
import { ImageModule } from './image/image.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    CategoryModule,
    ProductModule,
    CustomerModule,
    PrismaModule,
    UserRoleModule,
    ValidationModule,
    SystemUserModule,
    ImageModule,
    CartModule,
  ],
})
export class AppModule {}
