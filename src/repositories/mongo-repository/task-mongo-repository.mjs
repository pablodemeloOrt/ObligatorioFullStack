import Task from "../../model/task.mjs";

const taskMongoRepository = {

    async createTask(data) {
        try {
            const task = new Task(data)
            const tarea = await task.save();
            console.log('tarea', tarea)
            return tarea;
        } catch (error) {
            console.log('No se pudo crear la tarea en mongo', error)
        }
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
        console.log('data', data)
        const { _id } = data;
        if (_id) {
            Task.deleteOne(data);
        } else {
            return new Error("Hubo un error al borrar la tarea, el id no puede ser nulo");
        }
    },
    //reemplaza el viejo por el nuevo
    async replaceTask(data) {
        return Task.findOneAndReplace(data);
    },

    //actualiza la tarea
    async updateTask() {
        return Task.findOneAndUpdate(data);
    }
}


export default taskMongoRepository;