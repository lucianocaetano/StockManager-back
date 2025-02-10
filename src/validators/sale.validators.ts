import { body } from "express-validator";

export const createSaleValidate = [
  body("client")
    .notEmpty()
    .withMessage("Is required")
    .isInt()
    .withMessage("Client must be an integer ID"),
  body("user")
    .notEmpty()
    .withMessage("Is required")
    .isInt()
    .withMessage("User must be an integer ID"),
  body("totalAmount")
    .notEmpty()
    .withMessage("Is required")
    .isFloat({ min: 0.01 })
    .withMessage("Total amount must be a number greater than 0"),
  body("paymentMethod")
    .notEmpty()
    .withMessage("Is required")
    .isString()
    .trim()
    .isIn(["cash", "card", "transfer"])
    .withMessage("Payment method must be 'cash', 'card', or 'transfer'"),
];

export const updateSaleValidate = [
  body("client").optional().isInt().withMessage("Client must be an integer ID"),
  body("user").optional().isInt().withMessage("User must be an integer ID"),
  body("totalAmount")
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage("Total amount must be a number greater than 0"),
  body("paymentMethod")
    .optional()
    .isString()
    .trim()
    .isIn(["cash", "card", "transfer"])
    .withMessage("Payment method must be 'cash', 'card', or 'transfer'"),
];
