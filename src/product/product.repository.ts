import { EntityRepository, Repository } from 'typeorm';
import { Category } from './category.entity';
import { Maker } from './maker.entity';

import { Product } from './product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {

  async addProduct(productData) {
    const category = new Category();
    let categoryItem
    if (await Category.findOne({ nameCategory: productData.category})) {
      categoryItem = await Category.findOne({ nameCategory: productData.category})
    } else {
      category.nameCategory = productData.category;
      await category.save()
      categoryItem = await Category.findOne({ nameCategory: productData.category})
    }

    const maker = new Maker();
    let makerItem
    if (await Maker.findOne({ nameMaker: productData.maker })) {
      makerItem = await Maker.findOne({ nameMaker: productData.maker })
    } else {
      maker.nameMaker = productData.maker;
      await maker.save();
      makerItem = await Maker.findOne({ nameMaker: productData.maker })
    }

    let product = new Product();
    product = { ...productData };
    product.categoryId = categoryItem.id;
    product.makerId = makerItem.id;
      
    return this.save(product);
  }

  async getAllProduct() {
    return this.find()
  }

  async getPhone() {
    const category = await Category.findOne({ nameCategory: "Смартфон" });
    return this.find({ categoryId: category.id })
  }

  async getLaptop() {
    const category = await Category.findOne({ nameCategory: "Ноутбук" });
    return this.find({ categoryId: category.id })
  }
}
