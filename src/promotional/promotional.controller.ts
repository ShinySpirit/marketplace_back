import { Controller, Get, HttpException, HttpStatus, Param, UseFilters } from '@nestjs/common';
import { PromotionalService } from './promotional.service';
import { HttpErrorFilter } from 'src/utils/http-exception.filter';
import { IResponse } from 'src/types/IResponse';
import { IProduct } from 'src/types/IProduct';

@Controller('promotional')
export class PromotionalController {
  constructor(private readonly promotionalService: PromotionalService) {}

  @UseFilters(new HttpErrorFilter())
  @Get('/:count')
  async getPromotionals(@Param('count') count: number): Promise<IResponse<IProduct[]>> {
    // if(!count) {
    //   throw new HttpException("Specify number of products as parameter", HttpStatus.BAD_REQUEST);
    // }
    return {
      statusCode: HttpStatus.OK,
      message: "OK",
      result: await this.promotionalService.getPromotionals(count)
    }
  }
}
