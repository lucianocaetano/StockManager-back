import { body } from "express-validator";
import { getUserByEmail } from "../daos/user.dao";

export const createUserValidate = [
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
  body("name")
    .notEmpty()
    .withMessage("Is required")
    .trim()
    .custom(async (value, { req }) => {
      const user = await getUserByEmail(req.body.email);

      if (!user) {
        throw new Error("This email does not exist.");
      }

      if (user.email === value) {
        return true;
      }

      throw new Error("This username is already in use.");
    }),
  body("password")
    .notEmpty()
    .withMessage("Is required")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Min 3 character"),
];

export const updateUserValidate = [
  body("email")
    .optional()
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
  body("name")
    .optional()
    .trim()
    .custom(async (value, { req }) => {
      const user = await getUserByEmail(req.body.email);

      if (!user) {
        throw new Error("This email does not exist.");
      }

      if (user.email === value) {
        return true;
      }

      throw new Error("This username is already in use.");
    }),
  body("password")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Min 3 character"),
];
