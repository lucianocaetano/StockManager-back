import express from "express";

import { handleFormErrors } from "../middleware/handleFormErrors";
import { login } from "../controllers/auth.controller";
import {loginValidate} from "../validators/auth.validators";

const router = express.Router();

router.post("/login", loginValidate, handleFormErrors, login);

export default router;
