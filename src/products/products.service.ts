import { Injectable, Logger, ParseFilePipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { IProduct } from 'src/types/IProduct';
import { IResponse } from 'src/types/IResponse';
import { Repository } from 'typeorm';
import { HttpStatus, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseFilesPipe implements PipeTransform<Express.Multer.File[]> {
    constructor(private readonly pipe: ParseFilePipe) {}

    async transform(
        files: Express.Multer.File[] | { [key: string]: Express.Multer.File[] },
    ) {
        for (const file of Object.values(files).flat())
            await this.pipe.transform(file);

        return files;
    }
}


@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>
    ) {}

    async getAllProducts(): Promise<IResponse<IProduct[]>> {
        try{
            const data = await this.productRepository.find();
            return {
                statusCode: HttpStatus.OK,
                message: "OK",
                result: data
            }
        } catch(e) {
            throw new Error(e);
        }
    }

    async getProductsByCategoryId(_categoryId: number): Promise<IResponse<IProduct[]>> {
        try{
            const data = await this.productRepository.find({
                where: {
                    categoryId: _categoryId
                }
            });
            return {
                statusCode: HttpStatus.OK,
                message: "OK",
                result: data
            }
        } catch(e) {
            throw new Error(e);
        }
    }

    async addOnePruduct(product: IProduct): Promise<IResponse<string>> {
        try {
            this.productRepository.save(product);
            return {
                statusCode: HttpStatus.OK,
                message: "OK",
                result: "Product inserted"
            }
        }catch(e) {
            throw new Error(e);
        }
    }

    async updateProduct(product: IProduct): Promise<IResponse<IProduct>> {
        try {
            const oldItem = await this.productRepository.findOne({
                where: { 
                    id: product.id  
                }
            });

            if(!oldItem){
                throw new Error("Product not found");
            }

            // If main image changes, it will be deleted from the list of images
            if(oldItem.images && product.mainImage)
            if(oldItem.images.includes(product.mainImage)) {
                oldItem.images.splice(oldItem.images.indexOf(product.mainImage),1)
                product.images.push(oldItem.mainImage);
            }
            //Concating images arrays: old and new
            if(oldItem.images)
            product.images = [...oldItem.images,...product.images].slice(0).slice(-9)

            

            await this.productRepository.update({
                id: product.id
            }, product)

            const newItem = await this.productRepository.findOne({
                where: {
                    id: product.id
                }
            })
            return {
                statusCode: HttpStatus.OK,
                message: "OK",
                result: newItem
            }
        } catch(e) {
            throw new Error(e);
        }
    }

    async deleteProductById(id: number): Promise<IResponse<string>> {
        try{
            let result = await this.productRepository.delete({
                id: id
            })
            if(result.affected === 0) {
                return {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: "Not found",
                    result: 'Product not found'
                }
            }
            return {
                statusCode: HttpStatus.OK,
                message: "OK",
                result: 'Product deleted'
            }
        } catch(e) {
            throw new Error(e);
        }
    }
}
