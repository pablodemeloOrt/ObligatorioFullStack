import express from "express";
import { createUser, loginUser, upgradePlan, getAllUsers} from "../../controllers/user-controller.mjs";
import { authMiddleware } from "../../middleware/auth-middleware.mjs";
import { validateRequest } from "../../middleware/validation.middleware.mjs";
import { validateLogin, validateSingup } from "../../validations/validation-user.mjs";
import reqValidate from "../../constants/request-validate-constants.mjs";

const routes = express.Router();

routes.get("/", authMiddleware, getAllUsers);
//routes.get("/", getAllUsers);
routes.patch("/plan/:id", authMiddleware, validateRequest(validateLogin, reqValidate.BODY), upgradePlan);



export default routes;