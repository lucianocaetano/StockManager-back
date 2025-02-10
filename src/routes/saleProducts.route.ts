import express from "express";

import {
  index,
  create,
  update,
  destroy,
} from "../controllers/saleProducts.controller";

import { handleFormErrors } from "../middleware/handleFormErrors";
import { handleGetSaleProduct } from "../middleware/saleProducts/handleGetSaleProduct";
import {
  index_permission,
  create_permission,
  destroy_permission,
  update_permission,
} from "../middleware/saleProducts/saleProducts.permissions"

import {
  createSaleProductValidate,
  updateSaleProductValidate,
} from "../validators/saleProducts.validators";

const router = express.Router({ mergeParams: true });

router.get("", index_permission, index);
router.post(
  "",
  createSaleProductValidate,
  handleGetSaleProduct,
  create_permission,
  handleFormErrors,
  create
);
router.put(
  "/:saleProduct",
  updateSaleProductValidate,
  handleGetSaleProduct,
  update_permission,
  handleFormErrors,
  update
);
router.delete("/:saleProduct", handleGetSaleProduct, destroy_permission, destroy);

export default router;
