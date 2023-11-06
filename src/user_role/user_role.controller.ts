import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UserRoleService } from './user_role.service';
import { UserRoleDto } from './dto/user_role.dto';

@Controller('user-role')
export class UserRoleController {
  constructor(private userRoleService: UserRoleService) {}
  @Post()
  create(@Body() dto: UserRoleDto) {
    return this.userRoleService.create(dto);
  }
  @Get()
  getAll() {
    return this.userRoleService.getAll();
  }
  @Get('active-role')
  getAllActive() {
    return this.userRoleService.getAllActive();
  }
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UserRoleDto) {
    return this.userRoleService.update(id, dto);
  }
  @Delete()
  remove(@Body('ids') ids: number[]) {
    return this.userRoleService.removeData(ids);
  }

  @Patch()
  updateStatus() {}
}
