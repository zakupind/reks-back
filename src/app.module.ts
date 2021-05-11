import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import ormconfig from './ormconfig';
import { ProductModule } from './product/product.module';
import { RarserModule } from './parser/parser.module';
import { SearchModule } from './search/search.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductModule,
    RarserModule,
    SearchModule
  ],
})
export class AppModule {}
