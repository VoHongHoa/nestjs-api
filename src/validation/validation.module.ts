import { Global, Module } from '@nestjs/common';
import { UserRoleValidation } from './user_role.validation';
import { SystemUserValidation } from './system_user.validation';
import { CustomerValidation } from './customer.validation';
import { CategoryValidation } from './category.validation';
import { ProductValidation } from './product.validation';
import { ImageValidation } from './image.validation';
import { CartValidation } from './cart.validation';

@Global()
@Module({
  providers: [
    UserRoleValidation,
    SystemUserValidation,
    CustomerValidation,
    CategoryValidation,
    ProductValidation,
    ImageValidation,
    CartValidation,
  ],
  exports: [
    UserRoleValidation,
    SystemUserValidation,
    CustomerValidation,
    CategoryValidation,
    ProductValidation,
    ImageValidation,
    CartValidation,
  ],
})
export class ValidationModule {}
