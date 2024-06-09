import { Controller, Get } from '@nestjs/common';
import { HealthcheckService } from './healthcheck.service';



@Controller('healthcheck')
export class HealthcheckController {   
    constructor(
        private healthckeckService: HealthcheckService
    ) {}
    @Get()
    healthcheck() {
        return this.healthckeckService.healthcheck()
    }
}

