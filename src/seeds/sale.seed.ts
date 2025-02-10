import { Prisma } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { createManySales } from "../daos/sale.dao";
import { create_clients } from "./client.seed";
import { getClients } from "../daos/client.dao";
import {getUsers} from "../daos/user.dao";

export const create_sales = async () => {
  await create_clients();

  const clients = await getClients({});
  const users = await getUsers({});

  const list: Prisma.SaleCreateManyInput | Prisma.SaleCreateManyInput[] = [];

  for (let index = 0; index < 30; index++) {
    const randomClient = clients[Math.floor(Math.random() * clients.length)];
    const randomUser = users[Math.floor(Math.random() * users.length)];

    list.push({
      clientId: randomClient.id,
      userId: randomUser.id,
      totalAmount: faker.number.float({
        min: 1,
        max: 1000,
        multipleOf: 0.01,
      }),
      paymentMethod: faker.helpers.arrayElement(["cash", "card", "transfer"]),
    });
  }

  await createManySales(list);

  console.log("sales created successfully");
};
