import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSale = async (id: number) => {
  return await prisma.sale.findUnique({
    where: {
      id,
    },
    include: {
      client: true,
      user: true,
      SaleProducts: {
        include: {
          product: true,
        },
      },
    },
  });
};

export const getSales = async (query: Prisma.SaleFindManyArgs = {}) => {
  return await prisma.sale.findMany({
    ...query,
    include: {
      client: true,
      SaleProducts: {
        include: {
          product: true,
        },
      },
    },
  });
};

export const createSale = async (data: Prisma.SaleCreateInput) => {
  return await prisma.sale.create({
    data,
  });
};

export const updateSale = async (id: number, data: Prisma.SaleCreateInput) => {
  return await prisma.sale.update({
    where: { id },
    data,
  });
};

export const showSale = async (id: number) => {
  return await prisma.sale.findUnique({
    where: { id },
  });
};

export const destroySale = async (id: number) => {
  return await prisma.sale.delete({
    where: { id },
  });
};

export const createManySales = async (
  data: Prisma.SaleCreateManyInput | Prisma.SaleCreateManyInput[]
) => {
  return await prisma.sale.createMany({ data });
};

