import { Prisma } from "@prisma/client";
import { create_categories } from "./category.seed";
import { create_providers } from "./provider.seed";
import { getCategories } from "../daos/category.dao";
import { getProviders } from "../daos/provider.dao";
import { faker } from "@faker-js/faker";
import { createManyProducts } from "../daos/product.dao";

export const create_products = async (): Promise<void> => {
  await create_categories();
  await create_providers();

  const categories = await getCategories({});
  const providers = await getProviders({});

  const list: Prisma.ProductCreateManyInput | Prisma.ProductCreateManyInput[] =
    [];

  for (let index = 0; index < 30; index++) {
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    const randomProvider =
      providers[Math.floor(Math.random() * providers.length)];

    list.push({
      name: faker.person.firstName(),
      image: undefined,
      description: faker.lorem.paragraph(),
      categoryId: randomCategory.id,
      providerId: randomProvider.id,
      quantityInStock: faker.number.int({ min: 1, max: 20 }),
      unitPrice: faker.number.float(),
    });
  }

  await createManyProducts(list);

  console.log("products created successfully");
};
