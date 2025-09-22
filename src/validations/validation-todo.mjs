import Joi from "joi"

export const validateCreateTodo = Joi.object({
    title: Joi.string().min(3).max(40).required(),
    completed: Joi.boolean().default(false),
    // userId: Joi.string().required()
});


export const validateGetTodoById = Joi.object({
    id: Joi.string().required()
});