
import { Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { getSales } from "../daos/sale.dao";
import { getProducts } from "../daos/product.dao";
import { createManySaleProducts } from "../daos/saleProduct.dao";
import {create_sales} from "./sale.seed";

export const create_sale_products = async () => {

  await create_sales()

  const sales = await getSales({});
  const products = await getProducts({});

  const list: Prisma.SaleProductsCreateManyInput[] = [];

  for (let i = 0; i < 50; i++) {
    const randomSale = sales[Math.floor(Math.random() * sales.length)];
    const randomProduct = products[Math.floor(Math.random() * products.length)];

    list.push({
      saleId: randomSale.id,
      productId: randomProduct.id,
      quantity: faker.number.int({ min: 1, max: 10 }),
      price: faker.number.float({ min: 1, max: 500, multipleOf: 0.01 })
    });
  }

  await createManySaleProducts(list);

  console.log("SaleProducts created successfully");
};

