import { body } from "express-validator";

export const createCategoryValidate = [
  body("name").notEmpty().withMessage("Is required").trim(),
  body("description").notEmpty().withMessage("Is required").trim(),
];

export const updateCategoryValidate = [
  body("name").optional().trim(),
  body("description").optional().trim(),
];
