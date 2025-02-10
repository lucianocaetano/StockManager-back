import express from "express";

import {
  index,
  create,
  update,
  destroy,
} from "../controllers/categories.controller";
import { handleFormErrors } from "../middleware/handleFormErrors";
import {
  createCategoryValidate,
  updateCategoryValidate,
} from "../validators/category.validators";
import { handleGetCategory } from "../middleware/categories/handleGetCategory";
import {
  index_permission,
  create_permission,
  destroy_permission,
  update_permission,
} from "../middleware/categories/categories.permissions";

const router = express.Router();

router.get("", index_permission, index);
router.post(
  "",
  handleGetCategory,
  create_permission,
  createCategoryValidate,
  handleFormErrors,
  create
);
router.put(
  "/:pk",
  handleGetCategory,
  update_permission,
  updateCategoryValidate,
  handleFormErrors,
  update
);
router.delete("/:pk", handleGetCategory, destroy_permission, destroy);

export default router;
