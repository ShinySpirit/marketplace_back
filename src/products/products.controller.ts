import { Controller, Get, Param, Post, Body, UseInterceptors, UploadedFiles, ParseFilePipe, FileTypeValidator, HttpException, HttpStatus } from '@nestjs/common';
import { ParseFilesPipe, ProductsService } from './products.service';
import { IResponse } from 'src/types/IResponse';
import { IProduct } from 'src/types/IProduct';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //Get all products by category ID
  @Get('/:id')
  async getProductsByCategoryId(@Param('id') id: number): Promise<IResponse<IProduct[]>> {
    return this.productsService.getProductsByCategoryId(id);
  }

  // Add one product Post route
  @Post()
  // Interceptor for files. Catches one main image and up to 9 images
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'mainImage', maxCount: 1 },
    { name: 'images', maxCount: 9 },
  ], {
      // Describe the file storage and way to name saved images
      storage: diskStorage({
      destination: join(process.cwd(), './static'),
      filename(req, file, callback) {
        var rightNow = new Date();
        var res = rightNow.toISOString().slice(0,19).replace(/-|:/g,"");
        callback(null, `${res}-${file.originalname}`)
      },
    })
  }))
  async addOnePruduct(
    // Recieving body with fields except images
    @Body() 
    product: IProduct,
    // Custom validator for multiple images
    @UploadedFiles(new ParseFilesPipe(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      })
    )) 
    files: { 
      mainImage: Express.Multer.File[], 
      images: Express.Multer.File[] 
    }
  ): Promise<IResponse<string>> {
    // Writing image names into product model object
    if(files.mainImage) {
      product.mainImage = files.mainImage[0].filename;
    } else if(files.images) {
      product.mainImage = files.images.shift().filename;
    }
    if(files.images) {
      let tempImgArr = [];
      files.images.forEach(value => {
        tempImgArr.push(value.filename);
      })
      product.images = tempImgArr;
    } else {
      product.images = [];
    }    
    // Writing product model object to database
    return this.productsService.addOnePruduct(product);
  }
}
