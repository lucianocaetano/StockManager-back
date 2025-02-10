import { Request, Response, NextFunction } from "express";
import { getSale } from "../../daos/sale.dao";

export const index_permission = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const user = req.user;

  if (user.role === "Admin" || user.role === "Seller") {
    next();
    return;
  }

  res.status(401).json({
    error: "Unauthorized",
  });
};

export const update_permission = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { pk } = req.params;
  const user = req.user;

  const sale = await getSale(Number(pk));

  if (user.role === "Admin") {
    next();
    return;
  } else if (user.role === "Seller" && sale?.user.id === user.id) {
    next();
    return;
  }

  res.status(401).json({
    error: "Unauthorized",
  });};

export const create_permission = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const user = req.user;

  if (user.role === "Seller" || user.role === "Admin") {
    next();
    return;
  }

  res.status(401).json({
    error: "Unauthorized",
  });
};

export const show_permission = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { pk } = req.params;
  const user = req.user;

  const sale = await getSale(Number(pk));

  if (user.role === "Admin") {
    next();
    return;
  } else if (user.role === "Seller" && sale?.user.id === user.id) {
    next();
    return;
  }

  res.status(401).json({
    error: "Unauthorized",
  });
};

export const destroy_permission = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { pk } = req.params;
  const user = req.user;

  const sale = await getSale(Number(pk));

  if (user.role === "Admin") {
    next();
    return;
  } else if (user.role === "Seller" && sale?.user.id === user.id) {
    next();
    return;
  }

  res.status(401).json({
    error: "Unauthorized",
  });
};
