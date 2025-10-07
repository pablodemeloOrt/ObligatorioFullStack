import Joi from "joi";
import Category from "../constants/category.mjs";
// Para crear un proyecto
export const validateCreateProject = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().allow(""),
    category: Joi.string(),
    owner: Joi.string().required()
});
// Para actualizar un proyecto (PUT/PATCH)
export const validateUpdateProject = Joi.object({
    name: Joi.string().min(3).max(30),
    description: Joi.string().allow(""),
});
// Para obtener/borrar un proyecto por id
export const validateProjectIdParam = Joi.object({
    id: Joi.string().required(),
});
