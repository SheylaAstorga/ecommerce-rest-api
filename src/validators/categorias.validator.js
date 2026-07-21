import { body } from "express-validator";

export const validarCategoriasProductos = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),

  body("descripcion").notEmpty().withMessage("La descripción es obligatoria"),
];
