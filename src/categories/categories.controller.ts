import { Controller, Get, Post, Patch, Body, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, HttpException, HttpStatus, Logger, UseFilters, Delete, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { IResponse } from 'src/types/IResponse';
import { ICategory } from 'src/types/ICategory';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { HttpErrorFilter } from 'src/utils/http-exception.filter';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Get all categories
  @Get()
  // Exception filter
  @UseFilters(new HttpErrorFilter())
  async getCategories(): Promise<IResponse<ICategory[]>> {
    return this.categoriesService.getCategories();
  }

  // Add one product Post route
  @Post()
  // Exception filter
  @UseFilters(new HttpErrorFilter())
  // Interceptor for image
  @UseInterceptors(FileInterceptor('image', {
    // Describe the file storage and way to name saved image
    storage: diskStorage({
      destination: join(process.cwd(), './static'),
      filename(req, file, callback) {
        var rightNow = new Date();
        var res = rightNow.toISOString().slice(0,19).replace(/-|:/g,"");
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
    if(!category.title) {
      throw new HttpException("Error while creating category: Title must be specified", HttpStatus.BAD_REQUEST)
    }
    // Writing image name into category model object
    category.image = image.filename
    // Writing category model object to database
    return this.categoriesService.createCategory(category);
  }

  @Patch('/:id')
  @UseFilters(new HttpErrorFilter())
  // Interceptor for image
  @UseInterceptors(FileInterceptor('image', {
    // Describe the file storage and way to name saved image
    storage: diskStorage({
      destination: join(process.cwd(), './static'),
      filename(req, file, callback) {
        var rightNow = new Date();
        var res = rightNow.toISOString().slice(0,19).replace(/-|:/g,"");
        callback(null, `${res}-${file.originalname}`)
      },
    })
  }))
  async updateCategory(
    // Recieving body with fields except image
    @Param('id') id: number,
    @Body()     
    category: ICategory,
    @UploadedFile(
      // Validator for image
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    image: Express.Multer.File
  ): Promise<IResponse<ICategory>> {
    category.id = id;
    if(image) {
      category.image = image.filename;
    }   
    // Writing category model object to database

    return this.categoriesService.updateCategory(category);

  }

  @Delete('/:id')
  @UseFilters(new HttpErrorFilter())
  async deleteCategoryById(@Param('id') id:number): Promise<IResponse<string>> {
    if(!id) {
      throw new HttpException("Category id must be specified for deleting", HttpStatus.BAD_REQUEST)
    }
    return this.categoriesService.deleteCategoryById(id);
  }

}
