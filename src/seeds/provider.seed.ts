import {Prisma} from "@prisma/client";
import { faker } from '@faker-js/faker';
import {createManyProviders} from "../daos/provider.dao";

export const create_providers = async () => {
  const list: Array<Prisma.ProviderCreateInput> = [];

  for (let index = 0; index < 30; index++) {
    list.push({
      name: faker.company.name(),
      contactInfo: faker.lorem.paragraph(),
    });
  }

  await createManyProviders(list)

  console.log("providers created successfully");
};
