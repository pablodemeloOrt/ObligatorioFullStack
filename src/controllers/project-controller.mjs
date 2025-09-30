import projectRepository from "../repositories/project-repository.mjs";
import "dotenv/config";

export const createProject = async (req, res) => {
    try {
        const project = req.body;
        const { id: userId } = req.user;
        // Agregar el usuario logueado como miembro inicial
        const projectData = {
            ...project,
            userId,
            members: [userId]
        };
        const projectSaved = await projectRepository.createProject(projectData);
        res.status(200).json({ project: projectSaved });
    } catch (error) {
        res.status(400).json({ message: "No pudo crear el proyecto" });
    }
}

export const getProjectsByUser = async (req, res) => {
    try {
        const { id: userId } = req.user;
        const userProjects = await projectRepository.getAllProjects({ userId });
        res.status(200).json({ projects: userProjects });
    } catch (error) {
        res.status(400).json({ message: "No pudo obtener los proyectos" });
    }
}
export const deleteProject = async (req, res) => {
    try {
        console.log('entro en delete');
        const _id = req.params.id;
        await projectRepository.deleteProject({ _id });
        res.status(200).json({ message: "Se borro correctamente" });
    } catch (error) {
        res.status(400).json({ message: "No pudo borrar el proyecto" });
    }
}
export const updateProject = async (req, res) => {
    try {
        const _id = req.params.id;
        const project = req.body;
        const data = { _id, ...project };
        const projectUpdated = await projectRepository.updateProject(data);
        res.status(200).json({ project: projectUpdated });
    } catch (error) {
        res.status(400).json({ message: "No pudo actualizar el proyecto" });
    }
}
export const replaceProject = async (req, res) => {
    try {
        const _id = req.params.id;
        const project = req.body;
        const data = { _id, ...project };
        const projectReplaced = await projectRepository.replaceProject(data);
        res.status(200).json({ project: projectReplaced });
    } catch (error) {
        res.status(400).json({ message: "No pudo reemplazar el proyecto" });
    }
}
export const getProjectByUser = async (req, res) => {
    try {
        const _id = req.params.id;
        const { id: userId } = req.user;
        const data = { _id, userId };
        const project = await projectRepository.getProjectByUser(data);
        res.status(200).json({ project });
    } catch (error) {
        res.status(400).json({ message: "No pudo obtener el proyecto" });
    }   
}

