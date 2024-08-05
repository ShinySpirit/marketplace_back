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
import { PromotionalModule } from './promotional/promotional.module';
import { Catch404Module } from './catch404/catch404.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserEntity } from './entities/user.entity';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), './static'),
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
      ],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [PingEntity, CategoryEntity, ProductEntity, UserEntity],
        synchronize: true,
      }),
    }),
    HealthcheckModule,
    CategoriesModule,
    ProductsModule,
    PromotionalModule,
    AuthModule, 
    UserModule,
    // Catch404Module MUST BE THE LAST IN ARRAY, IN OTHER CASE ALL ROUTES WILL BE 404 
    // Catch404Module, //Commented until fix conflict with static
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}