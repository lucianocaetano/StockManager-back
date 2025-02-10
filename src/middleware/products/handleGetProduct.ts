import { getProduct } from "../../daos/product.dao";
import { Request, Response, NextFunction } from "express";

export const handleGetProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { pk } = req.params;

  try {
    const product = await getProduct(Number(pk));

    if (product) {
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
