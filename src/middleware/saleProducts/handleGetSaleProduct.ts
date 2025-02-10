import { Request, Response, NextFunction } from "express";
import {getSaleProduct} from "../../daos/saleProduct.dao";

export const handleGetSaleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { saleProduct: pk } = req.params;

  try {
    const saleProduct = await getSaleProduct(Number(pk));

    if (saleProduct) {
      next();
      return;
    }

    res.status(404).json({
      error: "Not Found",
    });
  } catch (err) {
    res.status(404).json({
      error: "Not Found",
    });
  }
};
