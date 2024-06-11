import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PingEntity } from './healthcheck/entities/healthcheck.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [PingEntity]
      }),
    }),
    HealthcheckModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}