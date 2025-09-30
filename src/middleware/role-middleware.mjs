// Middleware para verificar roles de usuario
export const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        const user = req.user; // Asumimos que el usuario ya está autenticado y su información está en req.user
        if (user && user.role === requiredRole) {
            next(); // El usuario tiene el rol requerido, continuar
        } else {
            res.status(403).json({ message: "Acceso denegado: no tienes el rol necesario" });
        }
    };
}
