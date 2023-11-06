import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SystemUserLogInDto, CustomerDto, CustomerSignInDto } from './dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('customer-sign-up')
  customerSignup(@Body() dto: CustomerDto) {
    return this.authService.customerSignup(dto);
  }
  @HttpCode(HttpStatus.OK)
  @Post('customer-sign-in')
  customerSignIn(@Body() dto: CustomerSignInDto) {
    return this.authService.customerSignIn(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('system-user-sign-in')
  systemUserSignIn(@Body() dto: SystemUserLogInDto) {
    return this.authService.systemUserSignIn(dto);
  }
}
