import { Injectable, Logger } from '@nestjs/common';
import { CategoryEntity } from 'src/entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IResponse } from 'src/types/IResponse';
import { ICategory } from 'src/types/ICategory';
import { HttpException, HttpStatus, } from '@nestjs/common';


@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(CategoryEntity)
        private categoryRepository: Repository<CategoryEntity>
    ) {}

    async getCategories(): Promise<IResponse<ICategory[]>> {
        try {
            let data = await this.categoryRepository.find()
            return {
                status_code: HttpStatus.OK,
                detail: "OK",
                result: data
            }
        } catch(e) {
            Logger.error(e);
            throw new HttpException("Error while fetching categories: " + e, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createCategory(category: ICategory): Promise<IResponse<string>> {
        try {
            this.categoryRepository.save(category);
            return {
                status_code: HttpStatus.OK,
                detail: "OK",
                result: "Category created"
            }
        } catch(e) {
            Logger.error(e);
            throw new HttpException("Error while creating category: " + e, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
