import { body } from "express-validator";
import { getUserByEmail } from "../daos/user.dao";

export const createClientValidate = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3 })
    .withMessage("Name must have at least 3 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address")
    .custom(async (value) => {
      const user = await getUserByEmail(value);
      if (user) {
        throw new Error("Email is already in use");
      }
      return true;
    }),
  body("phone")
    .optional()
    .isString()
    .withMessage("Phone must be a string")
    .isLength({ min: 10 })
    .withMessage("Phone number must be at least 10 characters"),
  body("address").optional().isString().withMessage("Address must be a string"),
];

export const updateClientValidate = [
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must have at least 3 characters"),
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Must be a valid email address")
    .custom(async (value) => {
      const user = await getUserByEmail(value);
      if (user) {
        throw new Error("Email is already in use");
      }
      return true;
    }),
  body("phone")
    .optional()
    .isString()
    .withMessage("Phone must be a string")
    .isLength({ min: 10 })
    .withMessage("Phone number must be at least 10 characters"),
  body("address").optional().isString().withMessage("Address must be a string"),
];
