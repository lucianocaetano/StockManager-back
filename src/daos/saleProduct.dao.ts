import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSaleProduct = async (id: number) => {
  const providers = await prisma.saleProducts.findFirst({
    where: {
      id
    }
  });

  return providers 
}

export const getSaleProducts = async (query: Prisma.SaleProductsFindManyArgs) => {
  const providers = await prisma.saleProducts.findMany(query);

  return providers 
}

export const createManySaleProducts = async (
  data: Prisma.SaleProductsCreateManyInput | Prisma.SaleProductsCreateManyInput[]
) => {
  return await prisma.saleProducts.createMany({ data });
};

export const createSaleProduct = async (data: Prisma.SaleProductsCreateInput) => {
  return await prisma.saleProducts.create({
    data,
  });
};

export const updateSaleProduct = async (
  id: number,
  data: Prisma.SaleProductsCreateManyInput
) => {
  return await prisma.saleProducts.update({
    where: {
      id,
    },
    data,
  });
};

export const destroySaleProduct = async (
  id: number,
) => {
  return await prisma.saleProducts.delete({
    where: {
      id,
    },
  });
};

