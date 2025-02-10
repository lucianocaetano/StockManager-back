import { Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { createManyClients } from "../daos/client.dao";

export const create_clients = async () => {
  const list: Array<Prisma.ClientCreateInput> = [];

  for (let index = 0; index < 30; index++) {
    list.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.helpers.maybe(() => faker.phone.number(), {
        probability: 0.8,
      }),
      address: faker.helpers.maybe(() => faker.location.streetAddress(), {
        probability: 0.7,
      })
    });
  }

  await createManyClients(list);

  console.log("clients created successfully");
};
