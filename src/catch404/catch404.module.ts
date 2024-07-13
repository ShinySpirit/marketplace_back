import { Module } from '@nestjs/common';
import { Catch404Service } from './catch404.service';
import { Catch404Controller } from './catch404.controller';

@Module({
  controllers: [Catch404Controller],
  providers: [Catch404Service],
})
export class Catch404Module {}
