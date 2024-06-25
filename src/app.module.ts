import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PingEntity } from './entities/healthcheck.entity';
import { CategoriesModule } from './categories/categories.module';
import { CategoryEntity } from './entities/category.entity';
import { ProductsModule } from './products/products.module';
import { ProductEntity } from './entities/product.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
        ServeStaticModule.forRoot({
          rootPath: join(process.cwd(), './static'),
        }),
      ],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [PingEntity, CategoryEntity, ProductEntity],
        synchronize: true,
      }),
    }),
    HealthcheckModule,
    CategoriesModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}