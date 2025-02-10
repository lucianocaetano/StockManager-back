import { body } from "express-validator";

export const createProviderValidate = [
  body("name").notEmpty().withMessage("Is required").trim(),
  body("contactInfo").notEmpty().withMessage("Is required").trim(),
];

export const updateProviderValidate = [
  body("name").optional().trim(),
  body("contactInfo").optional().trim(),
];
