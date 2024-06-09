import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { pingEntity } from './healthcheck.entity';
import { Repository } from 'typeorm';
import healthcheckObj from 'src/types/healthcheckObj';

@Injectable()
export class HealthcheckService {
    constructor(
        @InjectRepository(pingEntity)
        private pingRepository: Repository<pingEntity>
    ) {}

    async healthcheck(): Promise<healthcheckObj> {
        let time = {};
        try {
            time = (await this.pingRepository.query("SELECT NOW()"))[0].now
            console.log("Database ping, time: " + time)
        } catch(e) {
            console.error(e);
            return {
                status: 200,
                server: "Running",
                database: "Down"
            }
        }        
        return {
            status: 200,
            server: "Running",
            database: "Running, queried time: " + time
        }
    }
}
