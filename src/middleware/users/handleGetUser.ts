import { Request, Response, NextFunction } from "express";
import {getUser} from "../../daos/user.dao";

export const handleGetUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { pk } = req.params;

  try {
    const user = await getUser(Number(pk));

    if (user) {
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
