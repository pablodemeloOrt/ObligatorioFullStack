import express from "express";
import { createUser } from "../../controllers/user-controller.mjs";
const routes = express.Router();




routes.post("/", createUser);



export default routes;