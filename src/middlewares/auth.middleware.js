import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new AppError("Token no proporcionado", 401));
  }

  if (!authHeader.startsWith("Bearer ")) {
    return next(new AppError("Formato de token inválido", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = payload;

    next();
  } catch (error) {
    next(new AppError("Token inválido o expirado", 401));
  }
};

export const verificarRol = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return next(
        new AppError("No tienes permisos para realizar esta acción", 403),
      );
    }

    next();
  };
};
