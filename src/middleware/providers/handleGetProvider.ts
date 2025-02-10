import { Request, Response, NextFunction } from "express";
import {getProvider} from "../../daos/provider.dao";

export const handleGetProvider = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { pk } = req.params;

  try {
    const provider = await getProvider(Number(pk));

    if (provider) {
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
