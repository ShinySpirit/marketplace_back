import 'dotenv/config';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger, NotFoundException } from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  private readonly logger : Logger 
  constructor(){
    this.logger = new Logger 
  }
  
  catch(exception: Error, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    let statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    let message = exception instanceof HttpException ?  HttpStatus[statusCode].charAt(0) + HttpStatus[statusCode].split('_').join(' ').substring(1).toLowerCase() : 'Internal server error'
    let error = exception.message

    if(exception.message === "User not found" ) {
      statusCode = HttpStatus.NOT_FOUND;
      message = "Not found"
    }
    if(exception.message === "Wrong password" ) {
      statusCode = HttpStatus.UNAUTHORIZED;
      message = "Unauthorized"
    }

    const log: any = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      errorName: exception?.name,
      message: exception?.message,
      error
    };

    const res: any = {
      statusCode,
      message,
      error
    };
    this.logger.log( `request method: ${request.method} request url${request.url}`, JSON.stringify(log));
    response.status(statusCode).json(res);
  }
}