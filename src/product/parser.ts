import Nightmare from 'nightmare';
import cheerio from 'cheerio';

import { ProductParse } from '../parser/type/product'

const nightmare = Nightmare({ show: false });

const domain = "https://www.svyaznoy.ru";
const categories = ["/catalog/phone/225", "/catalog/notebook/1738"];

async function openPage(url) {
  return new Promise((resolve, reject) => {
    nightmare
      .goto(url)
      .wait("body")
      .evaluate(() => document.querySelector("body").innerHTML)

      .then((response) => resolve(response))
      .catch(reject);
  });
}

const getLinksProduct = (html, category) => {
  const links = [];
  const $ = cheerio.load(html);
  $(".b-product-block__info").each((i, elem) => {
    const link = $(elem).find(".b-product-block__main-link").attr("href");
    links.push({
      link: domain + link + "/specs#mainContent",
      category
    });
  });
  return links;
};

async function getListPagesPagination(html, category) {
  const pages = [];
  const $ = cheerio.load(html);
  const lastPage = $(".pagination").find(".last").text();
  for (let i = 1; i <= Number(lastPage); i++) {
    pages.push({
      link: domain + category + "/page-" + i,
      category
    });
  }
  return pages;
}

async function getLinksPaginationOfArray(array) {
  const linksAll = [];
  for (const category of array) {
    console.log(category);
    const htmlCategory = await openPage(domain + category);
    const linksCategory = await getListPagesPagination(htmlCategory, category);
    linksAll.push(...linksCategory);
  }
  return linksAll;
}

async function getDataProduct(html, nameCategory) {
  const $ = cheerio.load(html);

  let product: ProductParse

  product.category = nameCategory === categories[0] ? "Смартфон" : "Ноутбук";

  product.name = $(".b-offer-title").first().text();
  const nameArray = product.name.split(" ");
  nameArray.splice(0, 1);
  product.name = nameArray.join(" ");

  product.price = $(".b-offer-box__price").first().text();
  const priceArr = product.price.split("");
  priceArr.splice(priceArr.length - 5);
  const priceNumber = priceArr.filter(elem => elem != String.fromCharCode(160));
  product.price = Number(priceNumber.join(""));

  product.color = $("._active").find(".s-tooltip-text").text().trim();

  $('.b-product-tabs-block__content').find('tr')
  .each((i, elem) => {
    const nameParam = $(elem).children().first().text();
    
    if (nameParam.includes("Диагональ")) {
      product.diagonal = Number($(elem).children().last().text().trim());
    }
    if (nameParam.includes("Разрешение")) {
      product.screenResolution = $(elem).children().last().text().trim();
    }
    if (nameParam.includes("Фотокамера")) {
      product.camera = $(elem).children().last().text().trim();
    }
    if (nameParam.includes("Процессор")) {
      product.cpuName = $(elem).children().last().text().trim();
    }
    if (nameParam.includes("Частота процессора")) {
      product.cpuSpeed = Number($(elem).children().last().text().trim());
    }
    if (nameParam.includes("Количество ядер")) {
      product.cpuCore = Number($(elem).children().last().text().trim());
    }
    if (nameParam.includes("Встроенная память") || nameParam.includes("Емкость HDD")) {
      product.memoryHdd = Number($(elem).children().last().text().trim());
    }
    if (nameParam.includes("Емкость SSD")) {
      product.memorySsd = Number($(elem).children().last().text().trim())
    }
    if (nameParam.includes("Оперативная память")) {
      product.ram = Number($(elem).children().last().text().trim());
    }
    if (nameParam.includes("Материал корпуса")) {
      product.body = $(elem).children().last().text().trim();
    }
    if (nameParam.includes("Производитель")) {
      product.maker = $(elem).children().last().text().trim();
    }
  })

  console.log(product);
}

export async function mainFunction() {
  const linksPagePagination = await getLinksPaginationOfArray(categories);
  const linksProductsAll = [];
  for (const link of linksPagePagination) {
    console.log(link);
    const htmlPageProducts = await openPage(link.link);
    const linksProducts = await getLinksProduct(htmlPageProducts, link.category);
    linksProductsAll.push(...linksProducts);
  }
  for (const link of linksProductsAll) {
    const pageHtml = await openPage(link.link);
    getDataProduct(pageHtml, link.category);
  }
}

// mainFunction()
// .then(data => {
//   console.log("end");
//   fs.writeFile("./result.json", data, function(error) {
//     if (error) throw error;
//   });
// })
// .then(() => {
//   nightmare.end();
// })
// .catch(console.error)

async function mainFn() {
  const pageHtml = await openPage(
    "https://www.svyaznoy.ru/catalog/phone/224/5761622/specs#mainContent"
  );
  getDataProduct(pageHtml, categories[0]);
  nightmare.end()
}

mainFn();
