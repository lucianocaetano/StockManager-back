import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import {
  getSaleProducts,
  updateSaleProduct,
  createSaleProduct,
  destroySaleProduct,
} from "../daos/saleProduct.dao";

const prisma = new PrismaClient();

export const index = async (req: Request, res: Response) => {
  const {  pk: saleId } = req.params;
  const { page, limit } = req.query;

  try {
    const query: Prisma.SaleProductsFindManyArgs = {
      orderBy: { createdAt: "desc" },
    };

    if (page) query.skip = (Number(page) - 1) * Number(limit);
    if (limit) query.take = Number(limit);
    if (saleId) query.where = { saleId: Number(saleId) };

    const saleProducts = await getSaleProducts(query);

    const total_page = await prisma.saleProducts.count();

    const last_page = Math.ceil(total_page / Number(limit));

    const current_page = Number(page);

    res.json({
      saleProducts,
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
    const saleProduct = await createSaleProduct({
      ...data,
    });

    res.json({
      saleProduct,
    });
  } catch (err) {
    if (err instanceof Error)
      res.status(500).json({ error: err.message as string });
  }
};

export const update = async (req: Request, res: Response) => {
  const { saleProduct: pk } = req.params;
  const data = req.body;

  try {
    const saleProduct = await updateSaleProduct(Number(pk), {
      ...data,
    });

    res.json({
      saleProduct,
    });
  } catch (err) {
    if (err instanceof Error)
      res.status(500).json({ error: err.message as string });
  }
};

export const destroy = async (req: Request, res: Response) => {
  const { saleProduct } = req.params;

  try {
    await destroySaleProduct(Number(saleProduct));

    res.json({
      message: "OK",
    });
  } catch (err) {
    if (err instanceof Error)
      res.status(500).json({ error: err.message as string });
  }
};
