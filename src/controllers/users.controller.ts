import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import {getUsers, updateUser, createUser, destroyUser} from "../daos/user.dao";

const prisma = new PrismaClient()

export const index = async (req: Request, res: Response) => {
  const { page, limit } = req.query;

  try {
    const query: Prisma.UserFindManyArgs = {
      orderBy: { createdAt: "desc" },
    };

    if (page) query.skip = (Number(page) - 1) * Number(limit);
    if (limit) query.take = Number(limit);

    const users = await getUsers(query);

    const total_page = await prisma.user.count();

    const last_page = Math.ceil(total_page / Number(limit));
    
    const current_page = Number(page);

    res.json({
      users,
      meta: {
        last_page,
        current_page,
        total_page
      }
    });
  } catch (err) {
    if (err instanceof Error)
      res.status(500).json({ error: err.message as string });
  }
};

export const create = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const user = await createUser({
      ...data,
    });

    res.json({
      user,
    });
  } catch (err) {
    if (err instanceof Error)
      res.status(500).json({ error: err.message as string });
  }
};

export const update = async (req: Request, res: Response) => {
  const { pk } = req.params;
  const data = req.body;

  try {
    const user = await updateUser(Number(pk), {
      ...data,
    });

    res.json({
      user,
    });
  } catch (err) {
    if (err instanceof Error)
      res.status(500).json({ error: err.message as string });
  }
};

export const destroy = async (req: Request, res: Response) => {
  const { pk } = req.params;

  try {
    await destroyUser(Number(pk));

    res.json({
      message: "OK",
    });
  } catch (err) {
    if (err instanceof Error)
      res.status(500).json({ error: err.message as string });
  }
};
