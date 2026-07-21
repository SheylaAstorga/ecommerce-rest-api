import { registrarUsuarioService,loginUsuarioService } from "../services/auth.service.js";

export const registrarUsuario = async (req, res, next) => {
  try {
    const { nombre, apellido, email, telefono, password } = req.body;

    const usuario = await registrarUsuarioService(
      nombre,
      apellido,
      email,
      telefono,
      password,
    );

    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUsuario = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const respuesta = await loginUsuarioService(email, password);

    res.json(respuesta);
  } catch (error) {
    next(error);
  }
};
