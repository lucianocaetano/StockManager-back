import { Request, Response } from "express";
import { createSale, destroySale, getSales, showSale, updateSale } from "../daos/sale.dao";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const index = async (req: Request, res: Response) => {
  const { page, limit } = req.query;

  try {
    const query: Prisma.SaleFindManyArgs = {
      orderBy: { createdAt: "desc" },
      where: {},
    };

    if (page) query.skip = (Number(page) - 1) * Number(limit);
    if (limit) query.take = Number(limit);

    const sales = await getSales(query);

    const total_page = await prisma.sale.count();

    const last_page = Math.ceil(total_page / Number(limit));

    const current_page = Number(page);

    res.json({
      sales,
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
  const data = req.body

  try {
    const sale = await createSale(data);

    res.json({
      sale,
    });
  } catch (err) {
    if (err instanceof Error)
      res.status(500).json({ error: err.message as string });
  }
};

export const show = async (req: Request, res: Response) => {
  const { pk } = req.params

  try {
    const sale = await showSale(Number(pk));

    res.json({
      sale,
    });
  } catch (err) {
    if (err instanceof Error)
      res.status(500).json({ error: err.message as string });
  }
};

export const update = async (req: Request, res: Response) => {
  const { pk } = req.params
  const data = req.body

  try {
    const sale = await updateSale(Number(pk), data);

    res.json({
      sale,
    });
  } catch (err) {
    if (err instanceof Error)
      res.status(500).json({ error: err.message as string });
  }
};

export const destroy = async (req: Request, res: Response) => {
  const { pk } = req.params

  try {
    const sale = await destroySale(Number(pk));

    res.json({
      sale,
    });
  } catch (err) {
    if (err instanceof Error)
      res.status(500).json({ error: err.message as string });
  }
};
