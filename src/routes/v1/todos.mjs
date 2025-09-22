import express from "express";
import { createTodo, deleteTodo, getTodoById, getTodosByUser } from "../../controllers/todo-controller.mjs";
import { validateCreateTodo, validateGetTodoById } from "../../validations/validation-todo.mjs";
import { validateRequest } from "../../middleware/validation.middleware.mjs";
import reqValidate from "../../constants/request-validate-constants.mjs";
import { authMiddleware } from "../../middleware/auth-middleware.mjs";



const routes = express.Router();



//middleware autenticacion
routes.use(authMiddleware);


routes.post("/", validateRequest(validateCreateTodo, reqValidate.BODY), createTodo);

routes.get("/", getTodosByUser);
routes.get("/:id", validateRequest(validateGetTodoById, reqValidate.PARAM), getTodoById);
// routes.put("/", controlador);
// routes.patch("/:id", controlador);
routes.delete("/:id", deleteTodo);



export default routes;