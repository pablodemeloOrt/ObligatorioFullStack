import express from "express";
import {
	createProject,
	getProjectsByUser,
	deleteProject,
	updateProject,
	replaceProject,
	getProjectByUser
} from "../../controllers/project-controller.mjs";
import { validateProjectIdParam } from "../../validations/validation-task.mjs";
import { authMiddleware } from "../../middleware/auth-middleware.mjs";
import { validateRequest } from "../../middleware/validation.middleware.mjs";
import reqValidate from "../../constants/request-validate-constants.mjs";
import { validateUpdateProject, validateCreateProject } from "../../validations/validation-project.mjs";


const routes = express.Router();

// Middleware de autenticación
routes.use(authMiddleware);

// Crear proyecto
routes.post("/", validateRequest(validateCreateProject, reqValidate.BODY), createProject);

// Obtener todos los proyectos del usuario autenticado
routes.get("/", validateRequest(validateProjectIdParam, reqValidate.PARAMS), getProjectsByUser);

// Obtener un proyecto por id (y usuario)
routes.get("/:id", validateRequest(validateProjectIdParam, reqValidate.PARAMS), getProjectByUser);

// Actualizar parcialmente un proyecto (PATCH)
routes.patch("/:id", validateRequest(validateUpdateProject, reqValidate.BODY), updateProject);

// Reemplazar completamente un proyecto (PUT)
routes.put("/:id", validateRequest(validateUpdateProject, reqValidate.BODY), replaceProject);

// Eliminar un proyecto
routes.delete("/:id", validateRequest(validateProjectIdParam, reqValidate.PARAMS), deleteProject);

export default routes;
