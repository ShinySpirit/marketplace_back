import { Controller, Get } from '@nestjs/common';

type healthcheckObj = {
    status: number,
    server: string, 
    database: string,
}

@Controller('healthcheck')
export class HealthcheckController {
    @Get()
    healthcheck(): healthcheckObj {
        return {
            status: 200,
            server: "Running",
            database: "Not connected"
        }
    }
}
