import bcrypt from 'bcryptjs';
import generate_token from "../utils/generate_token";
import { getUserByEmail } from "../daos/user.dao";
import {User as IUser} from "@prisma/client";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user: IUser = await getUserByEmail(email) as IUser;

  const authorization = await bcrypt.compare(password, user?.password);

  if (!authorization) {
    res.status(400).json({
      password: "Invalid password",
    });
    return;
  }

  const access_token = generate_token(user);

  res.json({
    access_token,
  });
};

