import { AuthGuard } from '@nestjs/passport';

export class CustomerJwtGuard extends AuthGuard('customer_jwt') {
  constructor() {
    super();
  }
}
