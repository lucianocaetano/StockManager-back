import { body } from "express-validator"

export const createSaleProductValidate = [
  body("saleId").isInt().withMessage("Sale ID must be an integer."),
  body("productId").isInt().withMessage("Product ID must be an integer."),
  body("quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be an integer greater than 0."),
  body("price")
    .isFloat({ min: 0.01 })
    .withMessage("Price must be a float greater than 0."),
];

export const updateSaleProductValidate = [
  body("productId")
    .optional()
    .isInt()
    .withMessage("Product ID must be an integer."),
  body("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be an integer greater than 0."),
  body("price")
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage("Price must be a float greater than 0."),
];

