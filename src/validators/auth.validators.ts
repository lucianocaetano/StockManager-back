import { body } from "express-validator";
import {getUserByEmail} from "../daos/user.dao";

export const loginValidate = [
  body("email")
    .notEmpty()
    .withMessage("Is required")
    .trim()
    .isEmail()
    .withMessage("It must be an email")
    .normalizeEmail()
    .custom(async (value) => {
      const user = await getUserByEmail(value);

      if (!user) {
        throw new Error("This email does not exist.");
      }

      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("Is required")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Min 3 character"),
];

