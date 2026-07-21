import AppError from "../utils/AppError.js";
import {
  obtenerTodosLosUsuarios,
  buscarUsuarioPorId,
  insertarUsuario,
  actualizarUsuarioPorId,
  eliminarUsuarioPorId,
} from "../models/usuarios.model.js";

export const obtenerUsuariosService = async () => {
  return await obtenerTodosLosUsuarios();
};

export const obtenerUsuarioPorIdService = async (id) => {
  const usuario = await buscarUsuarioPorId(id);

  if (!usuario) {
    throw new AppError("Usuario no encontrado", 404);
  }

  return usuario;
};

export const crearUsuarioService = async (nombre, apellido, email, telefono) => {
  const usuario = await insertarUsuario(nombre, apellido, email, telefono);

  return usuario;
};

export const actualizarUsuarioService = async (nombre,apellido,email,telefono, id) => {
  const usuario = await actualizarUsuarioPorId(nombre,apellido,email,telefono, id);

  if (!usuario) {
    throw new AppError("Usuario no encontrado", 404);
  }

  return usuario;
};

export const eliminarUsuarioService = async (id) => {
  const usuario = await eliminarUsuarioPorId(id);

  if (!usuario) {
    throw new AppError("Usuario no encontrado", 404);
  }

  return usuario;
};