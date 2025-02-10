import express from "express";

import {
  index,
  create,
  update,
  destroy,
} from "../controllers/products.controller";
import { handleFormErrors } from "../middleware/handleFormErrors";
import {
  createProductValidate,
  updateProductValidate,
} from "../validators/product.validators";
import { handleGetProduct } from "../middleware/products/handleGetProduct";
import {
  create_permission,
  destroy_permission,
  index_permission,
  update_permission,
} from "../middleware/products/products.permissions";

const router = express.Router();

router.get("", index_permission, index);
router.post(
  "",
  handleGetProduct,
  create_permission,
  createProductValidate,
  handleFormErrors,
  create
);
router.put(
  "/:pk",
  handleGetProduct,
  update_permission,
  updateProductValidate,
  handleFormErrors,
  update
);
router.delete("/:pk", handleGetProduct, destroy_permission, destroy);

export default router;
