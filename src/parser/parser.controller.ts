import { Controller, Get } from '@nestjs/common';
import { ParserService } from './parser.service';
import { ProductRepository } from '../product/product.repository';

@Controller('parser')
export class ParserController {
  constructor(private parserService: ParserService, private productRepository: ProductRepository) {}

  @Get()
  async goParse() {
    this.parserService.startParse()
  }
}