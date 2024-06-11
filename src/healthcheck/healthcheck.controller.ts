import { Controller, Get } from '@nestjs/common';
import { HealthcheckService } from './healthcheck.service';
import { IResponse } from 'src/types/IResponse';
import { IHealthcheck } from 'src/types/IHealthcheck';



@Controller('healthcheck')
export class HealthcheckController {   
    constructor(
        private healthckeckService: HealthcheckService
    ) {}
    @Get()
    async healthcheck(): Promise<IResponse<IHealthcheck>> {
        return this.healthckeckService.healthcheck()
    }
}

