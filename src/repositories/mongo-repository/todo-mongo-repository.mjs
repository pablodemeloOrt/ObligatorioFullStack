import Todo from "../../model/todo.mjs";



const todoMongoRepository = {

    async createTodo(data) {
        try {
            const todo = new Todo(data)
            const tarea = await todo.save();
            console.log('tarea', tarea)
            return tarea;
        } catch (error) {
            console.log('No se pudo crear la tarea en mongo', error)
        }
    },

    //obtener una tarea del usuario
    async getTodoByUser(data) {
        return Todo.findOne(data);
    },

    //todas las tareas del usuario
    async getAllTodos(data) {
        return Todo.find(data);
    },


    //borrar tarea
    async deleteTodo(data) {
        console.log('data', data)
        const { _id } = data;
        if (_id) {
            Todo.deleteOne(data);
        } else {
            return new Error("Hubo un error al borrar la tarea, el id no puede ser nulo");
        }
    },
    //reemplaza el viejo por el nuevo
    async replaceTodo(data) {
        return Todo.findOneAndReplace(data);
    },

    //actualiza la tarea
    async updateTodo() {
        return Todo.findOneAndUpdate(data);
    }
}


export default todoMongoRepository;