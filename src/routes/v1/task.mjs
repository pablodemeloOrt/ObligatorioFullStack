import express from "express";
import { createTask, deleteTask, getTaskById, getTasksByUser, getTasksByUserAndProject, updateTask, getCategories } from "../../controllers/task-controller.mjs";
import { validateRequest } from "../../middleware/validation.middleware.mjs";
import reqValidate from "../../constants/request-validate-constants.mjs";
import { authMiddleware } from "../../middleware/auth-middleware.mjs";
import { validateCreateTask, validateUpdateTask, validateTaskIdParam, validateProjectIdParam } from "../../validations/validation-task.mjs";

const routes = express.Router();

// Middleware de autenticación
routes.use(authMiddleware);

// Crear tarea
routes.post("/", validateRequest(validateCreateTask, reqValidate.BODY), createTask);
// Consultar las categorías generales disponibles
routes.get("/categories", getCategories);
// Obtener una tarea por id (y usuario)
routes.get("/:id", validateRequest(validateTaskIdParam, reqValidate.PARAM), getTaskById);
// Obtener todas las tareas del usuario autenticado en un proyecto específico
routes.get("/project/:projectId", validateRequest(validateProjectIdParam, reqValidate.PARAM), getTasksByUserAndProject);
// Actualizar una tarea (PATCH)
routes.put("/:id", validateRequest(validateTaskIdParam, reqValidate.PARAM), validateRequest(validateUpdateTask, reqValidate.BODY), updateTask);
// Eliminar una tarea
routes.delete("/:id", validateRequest(validateTaskIdParam, reqValidate.PARAM), deleteTask);



export default routes;