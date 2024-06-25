import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { IResponse } from 'src/types/IResponse';
import { ICategory } from 'src/types/ICategory';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { join } from 'path';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Get all categories
  @Get()
  async getCategories(): Promise<IResponse<ICategory[]>> {
    return this.categoriesService.getCategories();
  }

  // Add one product Post route
  @Post()
  // Interceptor for image
  @UseInterceptors(FileInterceptor('image', {
    // Describe the file storage and way to name saved image
    storage: diskStorage({
      destination: join(process.cwd(), './static'),
      filename(req, file, callback) {
        var rightNow = new Date();
        var res = rightNow.toISOString().slice(0,10).replace(/-/g,"");
        callback(null, `${res}-${file.originalname}`)
      },
    })
  }))
  async createCategory(
    // Recieving body with fields except image
    @Body() 
    category: ICategory,
    @UploadedFile(
      // Validator for image
      new ParseFilePipe({
        fileIsRequired: true,
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    image: Express.Multer.File
  ): Promise<IResponse<string>> {
    // Writing image name into category model object
    category.image = image.filename
    // Writing category model object to database
    return this.categoriesService.createCategory(category);
  }
}
