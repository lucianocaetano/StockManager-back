import express from "express";

import {
  index,
  create,
  update,
  destroy,
} from "../controllers/client.controller";
import { handleFormErrors } from "../middleware/handleFormErrors";
import {
  createClientValidate,
  updateClientValidate,
} from "../validators/client.validators";
import { handleGetClient } from "../middleware/clients/handleGetClient";
import {
  index_permission,
  create_permission,
  destroy_permission,
  update_permission,
} from "../middleware/clients/clients.permissions";

const router = express.Router();

router.get("", index_permission, index);
router.post(
  "",
  handleGetClient,
  create_permission,
  createClientValidate,
  handleFormErrors,
  create
);
router.put(
  "/:pk",
  handleGetClient,
  update_permission,
  updateClientValidate,
  handleFormErrors,
  update
);
router.delete("/:pk", handleGetClient, destroy_permission, destroy);

export default router;
