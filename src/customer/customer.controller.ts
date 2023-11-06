import { Controller, Get, UseGuards } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { CustomerJwtGuard } from 'src/auth/guard';

@Controller('customer')
export class CustomerController {
  constructor() {}

  @UseGuards(CustomerJwtGuard)
  @Get('me')
  async getMe(@GetUser() customer: Customer) {
    return customer;
  }
}
