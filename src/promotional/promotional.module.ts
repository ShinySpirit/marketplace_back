import { Module } from '@nestjs/common';
import { PromotionalService } from './promotional.service';
import { PromotionalController } from './promotional.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity])
  ],
  controllers: [PromotionalController],
  providers: [PromotionalService],
})
export class PromotionalModule {}
