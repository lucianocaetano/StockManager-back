import { Request, Response, NextFunction } from "express";

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

export const update_permission = (
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

export const create_permission = (
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

export const destroy_permission = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const user = req.user;

  if (user.role === "Admin") {
    next();
    return;
  }

  res.status(401).json({
    error: "Unauthorized",
  });
};
