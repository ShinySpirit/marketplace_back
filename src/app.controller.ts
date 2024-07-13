import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { IResponse } from './types/IResponse';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): IResponse<string> {
    return {
      statusCode: HttpStatus.OK,
      message: "OK",
      result: this.appService.getMainPageResponse()
    }
  }
}
