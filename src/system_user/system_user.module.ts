import { Module } from '@nestjs/common';
import { SystemUserController } from './system_user.controller';
import { SystemUserService } from './system_user.service';

@Module({
  controllers: [SystemUserController],
  providers: [SystemUserService],
})
export class SystemUserModule {}
