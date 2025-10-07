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

    //todos los proyectos donde el usuario es miembro
    async getAllProjects(userId) {
        return Project.find({ members: userId });
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
    async updateProject(_id, updateData) {
        return Project.findByIdAndUpdate(_id, updateData, { new: true });
    }
}
export default projectMongoRepository;