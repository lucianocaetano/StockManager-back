import { PrismaClient, User as IUser, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const getUser = async (id: number): Promise<IUser | null> => {
  return await prisma.user.findUnique({
    where: { id },
  });
}

export const createUser = async (
  data: Prisma.UserCreateInput
): Promise<IUser> => {
  const hash = await bcrypt.hash(data.password, 10);
  return await prisma.user.create({
    data: {
      ...data,
      password: hash,
    },
  });
};

export const getUsers = async (query: Prisma.UserFindManyArgs) => {
  const categories = await prisma.user.findMany(query);

  return categories;
};

export const updateUser = async (id: number, data: Prisma.UserCreateInput) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data,
  });
};

export const destroyUser = async (id: number) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};
