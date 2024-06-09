import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pingEntity } from './healthcheck.entity';
import { HealthcheckController } from './healthcheck.controller';
import { HealthcheckService } from './healthcheck.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([pingEntity])
    ],
    controllers: [HealthcheckController],
    providers: [HealthcheckService]
})
export class HealthcheckModule {}
