import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { IProduct } from 'src/types/IProduct';
import { IResponse } from 'src/types/IResponse';
import { Repository } from 'typeorm';
import { HttpStatus, HttpException } from '@nestjs/common';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>
    ) {}

    async getProductsByCategoryId(_categoryId: number): Promise<IResponse<IProduct[]>> {
        try{
            const data = await this.productRepository.find({
                where: {
                    categoryId: _categoryId
                }
            });
            return {
                status_code: HttpStatus.OK,
                detail: "OK",
                result: data
            }
        } catch(e) {
            Logger.error(e)
            throw new HttpException("Error while fetching products: " + e, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async addOnePruduct(product: IProduct): Promise<IResponse<string>> {
        try {
            this.productRepository.save(product);
            return {
                status_code: HttpStatus.OK,
                detail: "OK",
                result: "Product inserted"
            }
        }catch(e) {
            Logger.error(e)
            throw new HttpException("Error while inserting product: " + e, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
