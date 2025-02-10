import { Request, Response, NextFunction } from "express";
import {getSale} from "../../daos/sale.dao";

export const handleGetSale = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { pk } = req.params;

  try {
    const sale = await getSale(Number(pk));

    if (sale) {
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
