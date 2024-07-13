import { Controller, HttpException, HttpStatus, Get, UseFilters } from '@nestjs/common';
import { Catch404Service } from './catch404.service';
import { IResponse } from 'src/types/IResponse';
import { HttpErrorFilter } from 'src/utils/http-exception.filter';

@Controller()
export class Catch404Controller {
  constructor(private readonly catch404Service: Catch404Service) {}

  @UseFilters(new HttpErrorFilter())
  @Get('*')
  notFound(): IResponse<string>{
    throw new HttpException('Wrong route', HttpStatus.NOT_FOUND);
  }
}
