import taskRepository from "../repositories/task-repository.mjs";

export const findTaskMiddleware = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const task = await taskRepository.getTaskById({ _id });
        if (!task) {
            return res.status(404).json({ message: "Tarea no encontrada" });
        }
        req.task = task;
        next();
    } catch (error) {
        res.status(400).json({ message: "No se pudo obtener la tarea" });
    }
};
