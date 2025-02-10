import {Prisma} from "@prisma/client";
import { faker } from '@faker-js/faker';
import {createManyCategories} from "../daos/category.dao";

export const create_categories = async () => {
  const list: Array<Prisma.CategoryCreateInput> = [];

  for (let index = 0; index < 30; index++) {
    list.push({
      name: faker.company.name(),
      description: faker.lorem.paragraph(),
    });
  }

  await createManyCategories(list)

  console.log("categories created successfully");
};
