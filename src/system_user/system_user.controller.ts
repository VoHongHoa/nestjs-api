import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SystemUserService } from './system_user.service';
import { SystemUserDto } from './dto';
import { GetUser } from 'src/auth/decorator';
import { SystemUser } from '@prisma/client';
import { SystemUserJwtGuard } from 'src/auth/guard';
import { TResponeCommon, TSystemUserResponseData } from 'types/response_types';
@Controller('system-user')
// @UseGuards(SystemUserJwtGuard)
export class SystemUserController {
  constructor(private userService: SystemUserService) {}

  @Post()
  create(
    @Body() dto: SystemUserDto,
  ): Promise<TSystemUserResponseData | TResponeCommon> {
    return this.userService.create(dto);
  }

  @Get()
  getAll(): Promise<TSystemUserResponseData[]> {
    return this.userService.getAll();
  }

  @UseGuards(SystemUserJwtGuard)
  @Get('me')
  async getMe(@GetUser() user: SystemUser): Promise<TSystemUserResponseData> {
    return user;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: SystemUserDto,
  ): Promise<TSystemUserResponseData | TResponeCommon> {
    return this.userService.update(id, dto);
  }
}
