import { Request, Response } from "express";
import {
  createProduct,
  destroyProduct,
  getProducts,
  updateProduct,
} from "../daos/product.dao";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const index = async (req: Request, res: Response) => {
  const { page, limit, category, search } = req.query;

  try {
    const query: Prisma.ProductFindManyArgs = {
      orderBy: { createdAt: "desc" },
      where: {},
    };

    if (page) query.skip = (Number(page) - 1) * Number(limit);
    if (limit) query.take = Number(limit);

    if (category) {
      query.where = {
        ...query.where,
        category: { id: Number(category) },
      };
    }

    if (search && typeof search === "string") {
      query.where = {
        ...query.where,
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      };
    }

    const products = await getProducts(query);

    const total_page = await prisma.product.count();

    const last_page = Math.ceil(total_page / Number(limit));
    
    const current_page = Number(page);

    res.json({
      products,
      meta: {
        current_page,
        last_page,
        total_page,
      },
    });
  } catch (err) {
    if (err instanceof Error)
      res.status(500).json({ error: err.message as string });
  }
};

export const create = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const product = await createProduct({
      ...data,
      category: {
        connect: { id: Number(data.category) },
      },
      provider: {
        connect: { id: Number(data.provider) },
      },
    });

    res.json({
      product,
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
    if (data.category) {
      data.category = { connect: { id: Number(data.category) } };
    }

    if (data.provider) {
      data.provider = { connect: { id: Number(data.provider) } };
    }

    const product = await updateProduct(Number(pk), {
      ...data,
    });

    res.json({
      product,
    });
  } catch (err) {
    if (err instanceof Error)
      res.status(500).json({ error: err.message as string });
  }
};

export const destroy = async (req: Request, res: Response) => {
  const { pk } = req.params;

  try {
    await destroyProduct(Number(pk));

    res.json({
      message: "OK",
    });
  } catch (err) {
    if (err instanceof Error)
      res.status(500).json({ error: err.message as string });
  }
};
