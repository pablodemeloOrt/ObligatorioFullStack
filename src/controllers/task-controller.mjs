import { createError } from "../error/create-error.mjs";
import userMongoRepository from "../repositories/mongo-repository/user-mongo-repository.mjs";
import taskRepository from "../repositories/task-repository.mjs";



export const createTodo = async (req, res) => {
    try {
        const task = req.body;
        const userId = req.user.id;
        task.userId = userId;
        const tarea = await taskRepository.createTodo(task);
        res.status(201).json({ tarea });
    } catch (error) {
        res.status(400).json({ message: "No pudo crear la tarea" });
    }
}

//devuelve una tarea para un cierto id del req
export const getTodoById = async (req, res) => {
    const _id = req.params.id;
    const userId = req.user.id;
    const data = {
        _id, userId
    };
    const tarea = await taskRepository.getTodoByUser(data);
    res.status(200).json({ tarea });
}



//obtener tareas del usuario 
export const getTodosByUser = async (req, res) => {
    console.log("entro en task by id")
    try {

        if (true) {
            // return createError("No pudo obtener las tareas", 400);
            throw new Error("prueba");
        }

        console.log("entro en task by id")
        const { id: userId } = req.user;
        const userTodos = await taskRepository.getAllTodos({ userId });
        res.status(200).json({ tareas: userTodos });
    } catch (error) {
        //res.status(400).json({ message: "No pudo obtener las tareas" }); 
        throw createError("No pudo obtener las tareas", 400);
    }
}



//borrar una tarea 
export const deleteTodo = async (req, res) => {
    try {
        console.log('entro en delete');
        const _id = req.params.id;
        await taskRepository.deleteTodo({ _id });
        res.status(200).json({ message: "Se borro correctamente" });
    } catch (error) {
        res.status(400).json({ message: "No pudo obtener las tareas" });
    }
}