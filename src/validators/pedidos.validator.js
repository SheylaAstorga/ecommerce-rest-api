import { body } from "express-validator";

export const validarPedidos = [
  body("usuario_id").isInt().withMessage("El usuario es obligatorio"),

  body("estado").notEmpty().withMessage("El estado es obligatorio"),

  body("productos")
    .isArray({ min: 1 })
    .withMessage("Debe enviar al menos un producto"),
];
