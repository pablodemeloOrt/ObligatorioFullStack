import Joi from "joi";

// Para crear una tarea
export const validateCreateTask = Joi.object({
    title: Joi.string().min(3).max(40).required(),
    description: Joi.string().allow(""),
    projectId: Joi.string().required(),
});

// Para actualizar una tarea (PUT/PATCH)
export const validateUpdateTask = Joi.object({
    title: Joi.string().min(3).max(40),
    description: Joi.string().allow(""),
    projectId: Joi.string(),
});

// Para obtener/borrar una tarea por id
export const validateTaskIdParam = Joi.object({
    id: Joi.string().required(),
});

// Para obtener tareas por usuario y proyecto
export const validateProjectIdParam = Joi.object({
    projectId: Joi.string().required(),
});