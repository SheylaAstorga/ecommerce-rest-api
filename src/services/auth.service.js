import bcrypt from "bcrypt";
import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";

import {
  buscarUsuarioPorEmail,
  insertarUsuario,
} from "../models/usuarios.model.js";

export const registrarUsuarioService = async (
  nombre,
  apellido,
  email,
  telefono,
  password,
) => {
  // Verificar si el email ya existe
  const usuarioExistente = await buscarUsuarioPorEmail(email);

  if (usuarioExistente) {
    throw new AppError("El email ya está registrado", 409);
  }

  // Encriptar contraseña
  const passwordHash = await bcrypt.hash(password, 10);

  // Guardar usuario
  const usuario = await insertarUsuario(
    nombre,
    apellido,
    email,
    telefono,
    passwordHash,
  );
  // Eliminamos el password antes de devolver el usuario
  const { password: _, ...usuarioSinPassword } = usuario;

  return usuarioSinPassword;
};

export const loginUsuarioService = async (email, password) => {
  const usuario = await buscarUsuarioPorEmail(email);

  console.log("Usuario encontrado:", usuario);

  if (!usuario) {
    throw new AppError("Usuario o contraseña incorrectos", 401);
  }

  const coincide = await bcrypt.compare(password, usuario.password);
  console.log("Contraseña ingresada:", password);
  console.log("Hash guardado:", usuario.password);
  console.log("¿Coincide?:", coincide);

  if (!coincide) {
    throw new AppError("Usuario o contraseña incorrectos", 401);
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

  const { password: _, ...usuarioSinPassword } = usuario;

  return {
    mensaje: "Login exitoso",
    token,
    usuario: usuarioSinPassword,
  };
};
