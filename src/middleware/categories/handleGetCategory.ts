import { Request, Response, NextFunction } from "express";
import {getCategory} from "../../daos/category.dao";

export const handleGetCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { pk } = req.params;

  try {
    const category = await getCategory(Number(pk));

    if (category) {
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
