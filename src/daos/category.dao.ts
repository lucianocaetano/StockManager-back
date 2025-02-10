import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCategory = async (id: number) => {
  const category = await prisma.category.findFirst({
    where: {
      id
    }
  });

  return category 
}

export const getCategories = async (query: Prisma.CategoryFindManyArgs) => {
  const categories = await prisma.category.findMany(query);

  return categories
}

export const createManyCategories = async (
  categories: Array<Prisma.CategoryCreateInput>
) => {
  return await prisma.category.createMany({ data: categories });
};


export const createCategory = async (data: Prisma.CategoryCreateInput) => {
  return await prisma.category.create({
    data,
  });
};

export const updateCategory = async (
  id: number,
  data: Prisma.CategoryCreateInput
) => {
  return await prisma.category.update({
    where: {
      id,
    },
    data,
  });
};

export const destroyCategory = async (
  id: number,
) => {
  return await prisma.category.delete({
    where: {
      id,
    },
  });
};

