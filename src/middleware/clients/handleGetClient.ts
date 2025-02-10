import { Request, Response, NextFunction } from "express";
import {getClient} from "../../daos/client.dao";

export const handleGetClient = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { pk } = req.params;

  try {
    const client = await getClient(Number(pk));

    if (client) {
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
