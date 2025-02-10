import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import {getProviders, updateProvider, createProvider, destroyProvider} from "../daos/provider.dao";

const prisma = new PrismaClient()

export const index = async (req: Request, res: Response) => {
  const { page, limit } = req.query;

  try {
    const query: Prisma.ProviderFindManyArgs = {
      orderBy: { createdAt: "desc" },
    };

    if (page) query.skip = (Number(page) - 1) * Number(limit);
    if (limit) query.take = Number(limit);

    const providers = await getProviders(query);

    const total_page = await prisma.product.count();

    const last_page = Math.ceil(total_page / Number(limit));
    
    const current_page = Number(page);

    res.json({
      providers,
      meta: {
        current_page,
        last_page,
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
    const provider = await createProvider({
      ...data,
    });

    res.json({
      provider,
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
    const provider = await updateProvider(Number(pk), {
      ...data,
    });

    res.json({
      provider,
    });
  } catch (err) {
    if (err instanceof Error)
      res.status(500).json({ error: err.message as string });
  }
};

export const destroy = async (req: Request, res: Response) => {
  const { pk } = req.params;

  try {
    await destroyProvider(Number(pk));

    res.json({
      message: "OK",
    });
  } catch (err) {
    if (err instanceof Error)
      res.status(500).json({ error: err.message as string });
  }
};
