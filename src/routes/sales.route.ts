import express from "express";

import { index, create, update, show, destroy } from "../controllers/sales.controller";
import { index_permission, show_permission } from "../middleware/sales/sales.permissions";
import { create_permission, destroy_permission, update_permission } from "../middleware/products/products.permissions";
import {createSaleValidate, updateSaleValidate} from "../validators/sale.validators";
import {handleFormErrors} from "../middleware/handleFormErrors";

const router = express.Router();

router.get("", index_permission, index);
router.get("/:pk", show_permission, show);
router.post("", create_permission, createSaleValidate, handleFormErrors, create);
router.put("/:pk", update_permission, updateSaleValidate, handleFormErrors, update);
router.delete("/:pk", destroy_permission, destroy);

export default router;
