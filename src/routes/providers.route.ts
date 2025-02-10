import express from "express";

import {
  index,
  create,
  update,
  destroy,
} from "../controllers/providers.controller";
import { handleFormErrors } from "../middleware/handleFormErrors";
import {
  createProviderValidate,
  updateProviderValidate,
} from "../validators/provider.validators";
import { handleGetProvider } from "../middleware/providers/handleGetProvider";
import {
  index_permission,
  create_permission,
  destroy_permission,
  update_permission,
} from "../middleware/providers/providers.permissions";

const router = express.Router();

router.get("", index_permission, index);
router.post(
  "",
  handleGetProvider,
  create_permission,
  createProviderValidate,
  handleFormErrors,
  create
);
router.put(
  "/:pk",
  handleGetProvider,
  update_permission,
  updateProviderValidate,
  handleFormErrors,
  update
);
router.delete("/:pk", handleGetProvider, destroy_permission, destroy);

export default router;
