import { Injectable, Logger } from '@nestjs/common';
import { CategoryEntity } from 'src/entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IResponse } from 'src/types/IResponse';
import { ICategory } from 'src/types/ICategory';
import { HttpStatus, } from '@nestjs/common';


@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(CategoryEntity)
        private categoryRepository: Repository<CategoryEntity>
    ) {}

    async getCategories(): Promise<IResponse<ICategory[]>> {
        try{
            let data = await this.categoryRepository.find()
            return {
                statusCode: HttpStatus.OK,
                message: "OK",
                result: data
            }
        } catch(e) {
            throw new Error(e);
        }
        
    }

    async createCategory(category: ICategory): Promise<IResponse<string>> {
        try {         
            this.categoryRepository.save(category);
            return {
                statusCode: HttpStatus.OK,
                message: "OK",
                result: "Category created"
            }
        } catch(e) {
            throw new Error(e);
        }
    }

    async updateCategory(category: ICategory): Promise<IResponse<ICategory>> {
        try {
            const oldItem = await this.categoryRepository.findOne({
                where: { 
                    id: category.id  
                }
            });

            if(!oldItem){
                throw new Error("Category not found")
            }

            await this.categoryRepository.update({
                id: category.id
            }, category)

            const newItem = await this.categoryRepository.findOne({
                where: {
                    id: category.id
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

    async deleteCategoryById(id: number): Promise<IResponse<string>> {
        try{
            let result = await this.categoryRepository.delete({
                id: id
            })
            if(result.affected === 0) {
                return {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: "Not found",
                    result: 'Category not found'
                }
            }
            return {
                statusCode: HttpStatus.OK,
                message: "OK",
                result: 'Category deleted'
            }
        } catch(e) {
            throw new Error(e);
        }
    }
}