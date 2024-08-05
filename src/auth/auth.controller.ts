import { Body, Controller, Post, UseFilters, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpErrorFilter } from 'src/utils/http-exception.filter';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { IResponse } from 'src/types/IResponse';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UseInterceptors(NoFilesInterceptor())
  @UseFilters(new HttpErrorFilter)
  async signIn(
  @Body()
    body: {login: string, password: string},
  ): Promise<IResponse<{ access_token: string }>> {
    return this.authService.signIn(body.login, body.password);
  }
}
