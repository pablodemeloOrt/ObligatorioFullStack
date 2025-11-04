import Task from "../../model/task.mjs";
import Project from "../../model/project.mjs";

const taskMongoRepository = {

    async createTask(data) {
        try {
            // Validar que venga el id del proyecto
            const { projectId } = data;
            if (!projectId) {
                throw new Error("La tarea debe tener un projectId asignado");
            }
            // Verificar que el proyecto exista
            const project = await Project.findById(projectId);
            if (!project) {
                throw new Error("El proyecto asignado no existe");
            }
            const task = new Task(data);
            const tarea = await task.save();
            console.log('tarea', tarea);
            return tarea;
        } catch (error) {
            console.log('No se pudo crear la tarea en mongo', error);
            throw error;
        }
    },

    //obtener tarea por id 
    async getTaskById(data) {
        return Task.findOne(data);
    },
    
    //obtener una tarea del usuario
    async getTaskByUser(data) {
        return Task.findOne(data);
    },

    //todas las tareas del usuario
    async getAllTask(data) {
        return Task.find(data);
    },


    //borrar tarea
    async deleteTask(data) {
        try {
            console.log('data', data);
            const { _id } = data;
            if (!_id) {
                throw new Error("Hubo un error al borrar la tarea, el id no puede ser nulo");
            }
            const task = await Task.findById(_id);
            if (!task) {
                throw new Error("No existe una tarea con ese id");
            }
            await Task.deleteOne({ _id });
        } catch (error) {
            console.log('No se pudo borrar la tarea en mongo', error);
            throw error;
        }
    },
    //reemplaza el viejo por el nuevo
    async replaceTask(data) {
        return Task.findOneAndReplace(data);
    },

    //actualiza la tarea
    async updateTask(data) {
        const { _id, ...updateData } = data;
        return Task.findOneAndUpdate({ _id }, updateData, { new: true });
    }
}


export default taskMongoRepository;