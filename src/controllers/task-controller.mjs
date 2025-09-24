import { createError } from "../error/create-error.mjs";
import userMongoRepository from "../repositories/mongo-repository/user-mongo-repository.mjs";
import taskRepository from "../repositories/task-repository.mjs";
import Category from "../constants/category.mjs";


import Plan from "../constants/plan.mjs";

export const createTask = async (req, res) => {
    try {
        const task = req.body;
        const userId = req.user.id;
        task.userId = userId;

        // Obtener el usuario para saber su plan
        const user = await userMongoRepository.getUserById(userId);
        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }


        // Contar tareas del usuario en el proyecto específico
        const { projectId } = task;
        if (!projectId) {
            return res.status(400).json({ message: "Falta el projectId en la tarea" });
        }
        const projectTasks = await taskRepository.getAllTask({ userId, projectId });
        if (user.plan === Plan.PLUS && projectTasks.length >= 10) {
            return res.status(403).json({ message: "Los usuarios PLUS solo pueden tener hasta 10 tareas por proyecto" });
        }

        const tarea = await taskRepository.createTask(task);
        res.status(201).json({ tarea });
    } catch (error) {
        res.status(400).json({ message: "No pudo crear la tarea" });
    }
}

//devuelve una tarea para un cierto id del req
export const getTaskById = async (req, res) => {
    const _id = req.params.id;
    const userId = req.user.id;
    const data = {
        _id, userId
    };
    const tarea = await taskRepository.getTaskByUser(data);
    res.status(200).json({ tarea });
}

//obtener tareas del usuario 
export const getTasksByUser = async (req, res) => {
    console.log("entro en task by id")
    try {
        console.log("entro en task by id")
        const { id: userId } = req.user;
        const userTasks = await taskRepository.getAllTasks({ userId });
        res.status(200).json({ tareas: userTasks });
    } catch (error) {
        //res.status(400).json({ message: "No pudo obtener las tareas" }); 
        throw createError("No pudo obtener las tareas", 400);
    }
}

//obtener tareas del usuario 
export const getTasksByUserAndProject = async (req, res) => {
    try {
        console.log("entro en task by id and project")
        const { id: userId } = req.user;
        const { projectId } = req.params;
        const userTasks = await taskRepository.getAllTasks({ userId, projectId });
        res.status(200).json({ tareas: userTasks });
    } catch (error) {
        throw createError("No pudo obtener las tareas", 400);
    }
}
//modificar una tarea

export const updateTask = async (req, res) => {
    try {
        const _id = req.params.id;
        const userId = req.user.id;
        const taskData = req.body;
        const updatedTask = await taskRepository.updateTask({ _id, userId, ...taskData });
        if (!updatedTask) {
            return res.status(404).json({ message: "Tarea no encontrada o no pertenece al usuario" });
        }
        res.status(200).json({ tarea: updatedTask });
    } catch (error) {
        res.status(400).json({ message: "No pudo actualizar la tarea" });
    }
}



//borrar una tarea 
export const deleteTask = async (req, res) => {
    try {
        console.log('entro en delete');
        const _id = req.params.id;
        await taskRepository.deleteTask({ _id });
        res.status(200).json({ message: "Se borro correctamente" });
    } catch (error) {
        res.status(400).json({ message: "No pudo obtener las tareas" });
    }
}

export const getCategories = async (req, res) => {
    try {
        const categories = await categories; 
        res.status(200).json({ categories });
    } catch (error) {
        res.status(400).json({ message: "No pudo obtener las categorias" });
    }
}
