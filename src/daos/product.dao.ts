import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (query: Prisma.ProductFindManyArgs = {}) => {
  return await prisma.product.findMany(query);
};

export const getProduct = async (id: number) => {
  return await prisma.product.findFirst({
    where: {
      id
    }
  });
};

export const createProduct = async (product: Prisma.ProductCreateInput) => {
  return await prisma.product.create({
    data: product,
  });
};

export const updateProduct = async (
  id: number,
  data: Prisma.ProductCreateInput
) => {
  return await prisma.product.update({
    where: {
      id,
    },
    data,
  });
};

export const destroyProduct = async (
  id: number,
) => {
  return await prisma.product.delete({
    where: {
      id,
    },
  });
};


export const createManyProducts = async (
  products: Prisma.ProductCreateManyInput | Prisma.ProductCreateManyInput[]
) => {
  return await prisma.product.createMany({ data: products });
};
