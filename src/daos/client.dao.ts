import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getClient = async (id: number) => {
  const client = await prisma.category.findFirst({
    where: {
      id
    }
  });

  return client 
}

export const getClients = async (query: Prisma.ClientFindManyArgs) => {
  const categories = await prisma.client.findMany(query);

  return categories
}

export const createManyClients = async (
  categories: Array<Prisma.ClientCreateInput>
) => {
  return await prisma.client.createMany({ data: categories });
};


export const createClient = async (data: Prisma.ClientCreateInput) => {
  return await prisma.client.create({
    data,
  });
};

export const updateClient = async (
  id: number,
  data: Prisma.ClientCreateInput
) => {
  return await prisma.client.update({
    where: {
      id,
    },
    data,
  });
};

export const destroyClient = async (
  id: number,
) => {
  return await prisma.client.delete({
    where: {
      id,
    },
  });
};

