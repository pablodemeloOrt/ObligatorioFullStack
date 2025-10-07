import userRepository from "../repositories/user-repository.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const createUser = async (req, res) => {
    try {
        const user = req.body;
        // Validación de datos requeridos
        if (!user.name || !user.email || !user.password) {
            return res.status(400).json({ message: "Faltan datos requeridos (name, email o password)" });
        }
        const { password } = user;
        const hashPassword = await bcrypt.hash(password, 10);
        user.password = hashPassword;
        console.log('user', user)
        const userSaved = await userRepository.createUser(user);
        res.status(201).json({ usuario: userSaved });
    } catch (error) {
        // Validación de usuario duplicado
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return res.status(409).json({ message: "El email ya está registrado" });
        }
        res.status(400).json({ message: "No pudo crear usuario" });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await userRepository.getUsers();
        res.status(200).json({ users: users });
    } catch (error) {
        res.status(400).json({ message: "No pudo obtener los usuarios" });
    }
}


export const loginUser = async (req, res) => {

    const { email, password } = req.body;
    const user = await userRepository.getUserByEmail({ email });
    const { password: passwordHash } = user;
    const validatePassword = await bcrypt.compare(password, passwordHash);

    if (validatePassword) {

        const token = jwt.sign({ id: user._id, email: email, tipoUsuario: user.tipoUsuario }, process.env.PASS_JWT);
        res.status(200).json({ token: token })
    } else {
        res.status(401).json({ message: "Error en login, verifique credenciales" });
    }
}
//actualiza el plan del usuario
export const upgradePlan = async (req, res) => {
    try {
        const { id } = req.params;
        const userUpdated = await userRepository.upgradePlan({ _id: id });
        res.status(200).json({ user: userUpdated });
    } catch (error) {
        res.status(400).json({ message: error.message || "No pudo actualizar el plan del usuario" });
    }
}

//cambia el plan del usuario
export const downgradePlan = async (req, res) => {
    try {
        const { id } = req.params;
        const userUpdated = await userRepository.downgradePlan({ _id: id });
        res.status(200).json({ user: userUpdated });
    } catch (error) {
        res.status(400).json({ message: error.message || "No pudo cambiar el plan del usuario" });
    }
}




