import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { IResponse } from 'src/types/IResponse';
import { IProduct } from 'src/types/IProduct';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/:id')
  async getProductsByCategoryId(@Param('id') id: number): Promise<IResponse<IProduct[]>> {
    return this.productsService.getProductsByCategoryId(id);
  }

  @Post()
  async addOnePruduct(@Body() product: IProduct): Promise<IResponse<string>> {
    return this.productsService.addOnePruduct(product);
  }
}
