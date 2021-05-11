import { Injectable } from '@nestjs/common';
import cheerio from 'cheerio';
import Nightmare from 'nightmare';

import { ProductRepository } from '../product/product.repository';
import { ProductParse } from './type/product';

@Injectable()
export class ParserService {
  constructor(private productRepository: ProductRepository) {}
  nightmare = Nightmare({ show: false });

  domain = 'https://www.svyaznoy.ru';
  categories = ['/catalog/phone/225', '/catalog/notebook/1738'];

  async openPage(url) {
    return new Promise((resolve, reject) => {
      this.nightmare
        .goto(url)
        .wait('body')
        .evaluate(() => document.querySelector('body').innerHTML)

        .then(response => resolve(response))
        .catch(reject);
    });
  }

  getLinksProduct(html, category) {
    const links = [];
    const $ = cheerio.load(html);
    $('.b-product-block__info').each((i, elem) => {
      const link = $(elem).find('.b-product-block__main-link').attr('href');
      links.push({
        link: this.domain + link + '/specs#mainContent',
        category,
      });
    });
    return links;
  }

  async getListPagesPagination(html, category) {
    const pages = [];
    const $ = cheerio.load(html);
    const lastPage = $('.pagination').find('.last').text();
    for (let i = 1; i <= Number(lastPage); i++) {
      pages.push({
        link: this.domain + category + '/page-' + i,
        category,
      });
    }
    return pages;
  }

  async getLinksPaginationOfArray(array) {
    const linksAll = [];
    for (const category of array) {
      console.log(category);
      const htmlCategory = await this.openPage(this.domain + category);
      const linksCategory = await this.getListPagesPagination(
        htmlCategory,
        category,
      );
      linksAll.push(...linksCategory);
    }
    return linksAll;
  }

  async getDataProduct(html, nameCategory) {
    const $ = cheerio.load(html);

    const product: ProductParse = {
      name: '',
      category: '',
      price: null,
      color: '',
      diagonal: null,
      screenResolution: '',
      camera: '',
      cpuName: '',
      cpuSpeed: null,
      cpuCore: null,
      memoryHdd: null,
      memorySsd: null,
      ram: null,
      body: '',
      maker: '',
    };

    product.category = 
      nameCategory === this.categories[0] ? 'Смартфон' : 'Ноутбук';

    product.name = $('.b-offer-title').first().text();
    const nameArray = product.name.split(' ');
    nameArray.splice(0, 1);
    product.name = nameArray.join(' ');

    product.price = $('.b-offer-box__price').first().text();
    const priceArr = product.price.split('');
    priceArr.splice(priceArr.length - 5);
    const priceNumber = priceArr.filter(
      elem => elem != String.fromCharCode(160),
    );
    product.price = Number(priceNumber.join(''));

    product.color = $('._active').find('.s-tooltip-text').text().trim();

    $('.b-product-tabs-block__content')
      .find('tr')
      .each((i, elem) => {
        const nameParam = $(elem).children().first().text();

        if (nameParam.includes('Диагональ')) {
          product.diagonal = Number($(elem).children().last().text().trim());
        }
        if (nameParam.includes('Разрешение')) {
          product.screenResolution = $(elem).children().last().text().trim();
        }
        if (nameParam.includes('Фотокамера')) {
          product.camera = $(elem).children().last().text().trim();
        }
        if (nameParam.includes('Процессор')) {
          product.cpuName = $(elem).children().last().text().trim();
        }
        if (nameParam.includes('Частота процессора')) {
          product.cpuSpeed = Number($(elem).children().last().text().trim());
        }
        if (nameParam.includes('Количество ядер')) {
          product.cpuCore = Number($(elem).children().last().text().trim());
        }
        if (
          nameParam.includes('Встроенная память') ||
          nameParam.includes('Емкость HDD')
        ) {
          product.memoryHdd = Number($(elem).children().last().text().trim());
        }
        if (nameParam.includes('Емкость SSD')) {
          product.memorySsd = Number($(elem).children().last().text().trim());
        }
        if (nameParam.includes('Оперативная память')) {
          product.ram = Number($(elem).children().last().text().trim());
        }
        if (nameParam.includes('Материал корпуса')) {
          product.body = $(elem).children().last().text().trim();
        }
        if (nameParam.includes('Производитель')) {
          product.maker = $(elem).children().last().text().trim();
        }
      });

    return product;
  }

  async startParse() {
    const linksPagePagination = await this.getLinksPaginationOfArray(
      this.categories,
    );
    const linksProductsAll = [];
    for (const link of linksPagePagination) {
      console.log(link);
      const htmlPageProducts = await this.openPage(link.link);
      const linksProducts = this.getLinksProduct(
        htmlPageProducts,
        link.category,
      );
      linksProductsAll.push(...linksProducts);
    }
    for (const link of linksProductsAll) {
      try {
        const pageHtml = await this.openPage(link.link);
        const dataProduct = await this.getDataProduct(pageHtml, link.category);
        await this.productRepository.addProduct(dataProduct);
      } catch {
        console.log("ERROR", link.link)
      }
    }
  }
}
