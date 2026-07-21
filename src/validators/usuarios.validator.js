import { body } from "express-validator";

export const validarRegistroUsuario = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),

  body("apellido").notEmpty().withMessage("El apellido es obligatorio"),

  body("email").isEmail().withMessage("Debe ingresar un email válido"),

  body("telefono").notEmpty().withMessage("El teléfono es obligatorio"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
];
