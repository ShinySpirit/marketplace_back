import { Injectable } from '@nestjs/common';
import { IResponse } from './types/IResponse';

@Injectable()
export class AppService {
  getMainPageResponse(): string {
    return 'Hello! API is running, you may use routes.';
  }
}
