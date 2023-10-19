import { Controller, HttpCode, Post } from '@nestjs/common';
import { customSetTimeout } from '@commons/helpers/timeout.helper';

@Controller('auth')
export class AuthController {
  @Post('register')
  @HttpCode(201)
  async register() {
    await customSetTimeout(6000);

    return 'success registered';
  }
}
