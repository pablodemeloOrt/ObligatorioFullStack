
// Crear tarea
export const canCreateTask = (req, res, next) => {
    const user = req.user;
    const { assignedTo } = req.body;

    if (user.tipoUsuario === "admin") {
        return next();
    }
    
    if (
        String(user.tipoUsuario) === "user" &&
        (!assignedTo || String(assignedTo) === String(user.id))
    ) {
        return next();
    }
    return res.status(403).json({ message: "Solo puedes crear tareas para ti mismo" });
};

// Editar tarea
export const canEditTask = (task) => (req, res, next) => {
    const user = req.user;
    if (user.tipoUsuario === "admin") {
        return next();
    }

    if (
        String(user.tipoUsuario) === "user" &&
        (!assignedTo || String(assignedTo) === String(user.id))
    ) {
        return next();
    }
    return res.status(403).json({ message: "Solo puedes editar tus propias tareas" });
};

// Mover tarea de columna
export const canMoveTask = (task) => (req, res, next) => {
    const user = req.user;
    if (user.tipoUsuario === "admin") {
        return next();
    }
    if (user.tipoUsuario === "user" && String(task.assignedTo) === String(user.id || user._id)) {
        return next();
    }
    return res.status(403).json({ message: "Solo puedes mover tus propias tareas" });
};

// Eliminar tarea
export const canDeleteTask = (req, res, next) => {
    const user = req.user;
    if (user.tipoUsuario === "admin") {
        return next();
    }
    return res.status(403).json({ message: "Solo el administrador puede eliminar tareas" });
};
