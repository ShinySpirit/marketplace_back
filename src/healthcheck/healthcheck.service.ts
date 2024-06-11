import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PingEntity } from './entities/healthcheck.entity';
import { Repository } from 'typeorm';
import { IResponse } from 'src/types/IResponse';
import { IHealthcheck } from 'src/types/IHealthcheck';
import { HttpException, HttpStatus, } from '@nestjs/common';

@Injectable()
export class HealthcheckService {
    constructor(
        @InjectRepository(PingEntity)
        private pingRepository: Repository<PingEntity>
    ) {}

    async healthcheck(): Promise<IResponse<IHealthcheck>> {
        let time = {};
        try {
            time = (await this.pingRepository.query("SELECT NOW()"))[0].now 
            return {
                status_code: HttpStatus.OK,
                detail: "OK",
                result: {
                    database: "Running, queried time: "  + time,
                    server: "Running"
                }
            }
        } catch(e) {
            throw new HttpException("Database or server down", HttpStatus.INTERNAL_SERVER_ERROR)
        }        
        
    }
}
