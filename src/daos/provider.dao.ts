import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProvider = async (id: number) => {
  const providers = await prisma.provider.findMany({
    where: {
      id
    }
  });

  return providers 
}

export const getProviders = async (query: Prisma.ProviderFindManyArgs) => {
  const providers = await prisma.provider.findMany(query);

  return providers 
}

export const createManyProviders = async (
  providers: Array<Prisma.ProviderCreateInput>
) => {
  return await prisma.provider.createMany({ data: providers });
};

export const createProvider = async (data: Prisma.ProductCreateInput) => {
  return await prisma.provider.create({
    data,
  });
};

export const updateProvider = async (
  id: number,
  data: Prisma.ProviderCreateInput
) => {
  return await prisma.provider.update({
    where: {
      id,
    },
    data,
  });
};

export const destroyProvider = async (
  id: number,
) => {
  return await prisma.provider.delete({
    where: {
      id,
    },
  });
};

