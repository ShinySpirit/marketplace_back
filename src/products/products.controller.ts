import { Controller, Get, Param, Post, Patch, Delete, Body, UseInterceptors, UploadedFiles, ParseFilePipe, FileTypeValidator, HttpException, HttpStatus, UseFilters, Logger } from '@nestjs/common';
import { ParseFilesPipe, ProductsService } from './products.service';
import { IResponse } from 'src/types/IResponse';
import { IProduct } from 'src/types/IProduct';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { HttpErrorFilter } from 'src/utils/http-exception.filter';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

 

  //Get all products by category ID
  @Get('category/:id')
  @UseFilters(new HttpErrorFilter())
  async getProductsByCategoryId(@Param('id') id: number): Promise<IResponse<IProduct[]>> {
    return this.productsService.getProductsByCategoryId(id);
  }

  //Get all products
  @Get()
  @UseFilters(new HttpErrorFilter())
  async getAllProducts(): Promise<IResponse<IProduct[]>> {
    return this.productsService.getAllProducts();
  }

  //Get one product by ID
  @Get("/:id")
  @UseFilters(new HttpErrorFilter())
  async getOneProductById(@Param('id') id: number): Promise<IResponse<IProduct>> {
    const data = await this.productsService.getOneProductById(id);
    if(data.result == null) {
      throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
    }
    return this.productsService.getOneProductById(id);
  }

  // Add one product Post route
  @Post()
  @UseFilters(new HttpErrorFilter())
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
    if(
      !product.categoryId ||
      !product.title ||
      !product.price
    ) {
      throw new HttpException("Not all necessary fields were specified", HttpStatus.BAD_REQUEST);
    }
    product.description = product.description ? product.description : "";
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

  @Patch('/:id')
  @UseFilters(new HttpErrorFilter())
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
  async updateProductById(
    @Param('id') id: number,
    @Body() product: IProduct,
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
  ): Promise<IResponse<IProduct>> {
    product.id = id;
    if(files.mainImage) {
      product.mainImage = files.mainImage[0].filename;
    }
    if(files.images) {
      let tempImgArr = [];
      files.images.forEach(value => {
        tempImgArr.push(value.filename);
      })
      product.images = tempImgArr;
    } else {
      product.images = []
    }
    return this.productsService.updateProduct(product);
  }

  @Delete('/:id')
  @UseFilters(new HttpErrorFilter())
  async deleteProductById(@Param('id') id: number): Promise<IResponse<string>> {
    if(!id) {
      throw new HttpException("Product id must be specified for deleting", HttpStatus.BAD_REQUEST)
    }
    return this.productsService.deleteProductById(id);
  }

}




