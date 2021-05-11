import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ParserController } from './parser.controller';
import { ParserService } from './parser.service';
import { ProductRepository } from '../product/product.repository'

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository])],
  controllers: [ParserController],
  providers: [ParserService],
})
export class RarserModule {}
