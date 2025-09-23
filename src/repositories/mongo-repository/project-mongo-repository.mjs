import Project from "../../model/project.mjs";

const projectMongoRepository = {

    async createProject(data) {
        try {
            const project = new Project(data)
            const proyecto = await project.save();
            console.log('proyecto', proyecto)
            return proyecto;
        } catch (error) {
            console.log('No se pudo crear el proyecto en mongo', error)
        }
    },

    //obtener un proyecto del usuario
    async getProjectByUser(data) {
        return Project.findOne(data);
    },

    //todos los proyectos del usuario
    async getAllProjects(data) {
        return Project.find(data);
    }, 
    //borrar proyecto
    async deleteProject(data) {
        console.log('data', data)
        const { _id } = data;
        if (_id) {
            return Project.deleteOne(data);
        }
        return new Error("Hubo un error al borrar el proyecto, el id no puede ser nulo");
    },
    //reemplaza el viejo por el nuevo
    async replaceProject(data) {
        return Project.findOneAndReplace(data);
    },

    //actualiza el proyecto
    async updateProject(data) {
        return Project.findOneAndUpdate(data);
    }
}
export default projectMongoRepository;