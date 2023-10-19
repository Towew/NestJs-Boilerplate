import { Module } from '@nestjs/common';
import { AuthController } from '@auth-module/auth.controller';
import { AuthService } from '@auth-module/auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
