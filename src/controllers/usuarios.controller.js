import {
  obtenerUsuariosService,
  obtenerUsuarioPorIdService,
  crearUsuarioService,
  actualizarUsuarioService,
  eliminarUsuarioService,
} from "../services/usuarios.service.js";

export const obtenerUsuarios = async (req, res, next) => {
  try {
    const usuarios = await obtenerUsuariosService();
    res.json(usuarios);
  } catch (error) {
    next(error);
  }
};

export const obtenerUsuarioPorId = async (req, res, next) => {
  try {
    const usuario = await obtenerUsuarioPorIdService(req.params.id);
    res.json(usuario);
  } catch (error) {
    next(error);
  }
};

export const crearUsuario = async (req, res, next) => {
  try {
    const { nombre, apellido, email, telefono } = req.body;

    const usuario = await crearUsuarioService(
      nombre,
      apellido,
      email,
      telefono
    );

    res.status(201).json(usuario);
  } catch (error) {
    next(error);
  }
};

export const actualizarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, telefono } = req.body;

    const usuario = await actualizarUsuarioService(
      nombre,
      apellido,
      email,
      telefono,
      id
    );

    res.json(usuario);
  } catch (error) {
    next(error);
  }
};

export const eliminarUsuario = async (req, res, next) => {
  try {
    const usuario = await eliminarUsuarioService(req.params.id);

    res.json({
      mensaje: "Usuario eliminado",
      usuario,
    });
  } catch (error) {
    next(error);
  }
};