import { body } from "express-validator";
import { getCategory } from "../daos/category.dao";
import {getProvider} from "../daos/provider.dao";

export const createProductValidate = [
  body("name").notEmpty().withMessage("Is required").trim(),
  body("image").optional(),
  body("description").notEmpty().withMessage("Is required").trim(),
  body("category")
    .notEmpty()
    .withMessage("Is required")
    .trim()
    .isNumeric()
    .withMessage("The is field must be numeric")
    .custom(async (value) => {

      const category = await getCategory(Number(value));

      if (category) {
        return true;
      }

      throw new Error("The is field is incorrect");
    }),
  body("provider")
    .notEmpty()
    .withMessage("Is required")
    .trim()
    .isNumeric()
    .withMessage("The is field must be numeric")
    .custom(async (value) => {
      const provider = await getProvider(Number(value));

      if (provider) {
        return true;
      }

      throw new Error("The is field is incorrect");
    }),
  body("quantityInStock")
    .notEmpty()
    .withMessage("Is required")
    .isNumeric()
    .withMessage("The is field must be numeric"),
  body("unitPrice")
    .notEmpty()
    .withMessage("Is required")
    .isNumeric()
    .withMessage("The is field must be numeric"),
];

export const updateProductValidate = [
  body("name").optional().trim(),
  body("image").optional(),
  body("description").optional().trim(),
  body("category")
    .optional()
    .trim()
    .isNumeric()
    .withMessage("The is field must be numeric")
    .custom(async (value) => {
      const category = await getCategory(Number(value));

      if (category) {
        return true;
      }

      throw new Error("The is field is incorrect");
    }),
  body("provider")
    .optional()
    .trim()
    .isNumeric()
    .withMessage("The is field must be numeric")
    .custom(async (value) => {
      const provider = await getProvider(Number(value));

      if (provider) {
        return true;
      }

      throw new Error("The is field is incorrect");
    }),
  body("quantityInStock")
    .optional()
    .isNumeric()
    .withMessage("The is field must be numeric"),
  body("unitPrice")
    .optional()
    .isNumeric()
    .withMessage("The is field must be numeric"),
];
