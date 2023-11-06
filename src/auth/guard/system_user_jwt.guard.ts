import { AuthGuard } from '@nestjs/passport';

export class SystemUserJwtGuard extends AuthGuard('system_user_jwt') {
  constructor() {
    super();
  }
}
