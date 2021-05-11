import { Injectable } from '@nestjs/common';
import { PaginateQuery, paginate, Paginated } from 'nestjs-paginate';
import { Category } from './category.entity';

import { Product } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  public findAll(query: PaginateQuery): Promise<Paginated<Product>> {
    return paginate(query, this.productRepository, {
      sortableColumns: ['id', 'name',],
      searchableColumns: ['name'],
      defaultSortBy: [['id', 'DESC']],
    })
  }

  public async frindAllPhone(query: PaginateQuery): Promise<Paginated<Product>> {
    const categoryItem = await Category.findOne({ nameCategory: 'Смартфон' })

    return paginate(query, this.productRepository, {
      sortableColumns: ['id', 'name',],
      searchableColumns: ['name'],
      defaultSortBy: [['id', 'DESC']],
      where: { categoryId: categoryItem.id }
    })
  }

  public async frindAllLaptop(query: PaginateQuery): Promise<Paginated<Product>> {
    const categoryItem = await Category.findOne({ nameCategory: 'Ноутбук' })

    return paginate(query, this.productRepository, {
      sortableColumns: ['id', 'name',],
      searchableColumns: ['name'],
      defaultSortBy: [['id', 'DESC']],
      where: { categoryId: categoryItem.id }
    })
  }
}
