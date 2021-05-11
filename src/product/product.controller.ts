import { Controller, Get } from '@nestjs/common';
import { Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate'
import { Product } from './product.entity';

import { ProductRepository } from './product.repository'
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productRepository: ProductRepository, private productService: ProductService) {}

  @Get()
  allProducts(@Paginate() query: PaginateQuery): Promise<Paginated<Product>> {
    return this.productService.findAll(query)
  }

  @Get('phone')
  allPhone(@Paginate() query: PaginateQuery): Promise<Paginated<Product>> {
    return this.productService.frindAllPhone(query);
  }

  @Get('laptop')
  allLaptop(){
    return this.productRepository.getLaptop()
  }
  // allLaptop(@Paginate() query: PaginateQuery): Promise<Paginated<Product>>  {
  //   return this.productService.frindAllLaptop(query)
  // }
}