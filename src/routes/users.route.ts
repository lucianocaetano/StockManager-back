import express from "express";

import {index, create, update, destroy} from "../controllers/users.controller";
import {handleFormErrors} from "../middleware/handleFormErrors";
import {createUserValidate, updateUserValidate} from "../validators/user.validators";
import {handleGetUser} from "../middleware/users/handleGetUser";

const router = express.Router();

router.get("", index);
router.post("", handleGetUser, createUserValidate, handleFormErrors, create);
router.put("/:pk", handleGetUser, updateUserValidate, handleFormErrors, update);
router.delete("/:pk", handleGetUser, destroy);

export default router;
