import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { IResponse } from 'src/types/IResponse';
import { ICategory } from 'src/types/ICategory';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getCategories(): Promise<IResponse<ICategory[]>> {
    return this.categoriesService.getCategories();
  }

  @Post()
  async createCategory(@Body() category: ICategory ): Promise<IResponse<string>> {
    return this.categoriesService.createCategory(category);
  }
}
