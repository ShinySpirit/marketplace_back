import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PingEntity } from './entities/healthcheck.entity';
import { HealthcheckController } from './healthcheck.controller';
import { HealthcheckService } from './healthcheck.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([PingEntity])
    ],
    controllers: [HealthcheckController],
    providers: [HealthcheckService]
})
export class HealthcheckModule {}
