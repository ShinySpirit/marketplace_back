import 'dotenv/config';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

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

    const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    const message = exception instanceof HttpException ?  HttpStatus[statusCode].charAt(0) + HttpStatus[statusCode].split('_').join(' ').substring(1).toLowerCase() : 'Internal server error'
    const error = exception.message

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