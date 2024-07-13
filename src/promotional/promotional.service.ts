import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product.entity';
import { IProduct } from 'src/types/IProduct';
import { Repository } from 'typeorm';

@Injectable()
export class PromotionalService {
    constructor(
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>
    ) {}

    async getPromotionals(count: number): Promise<IProduct[]>
    {   
        try {
            const promotionals = await this.productRepository
                .createQueryBuilder('promo')
                .select()
                .orderBy('RANDOM()')
                .take(count)
                .getMany();
            
            return promotionals;     
        } catch(e) {
            throw new Error(e)
        }
    }
}
