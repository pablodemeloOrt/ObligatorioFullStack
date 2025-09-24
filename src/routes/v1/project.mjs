import express from "express";
import {
	createProject,
	getProjectsByUser,
	deleteProject,
	updateProject,
	replaceProject,
	getProjectByUser
} from "../../controllers/project-controller.mjs";
import { authMiddleware } from "../../middleware/auth-middleware.mjs";

const routes = express.Router();

// Middleware de autenticación
routes.use(authMiddleware);

// Crear proyecto
routes.post("/", createProject);

// Obtener todos los proyectos del usuario autenticado
routes.get("/", getProjectsByUser);

// Obtener un proyecto por id (y usuario)
routes.get("/:id", getProjectByUser);

// Actualizar parcialmente un proyecto (PATCH)
routes.patch("/:id", updateProject);

// Reemplazar completamente un proyecto (PUT)
routes.put("/:id", replaceProject);

// Eliminar un proyecto
routes.delete("/:id", deleteProject);

export default routes;
