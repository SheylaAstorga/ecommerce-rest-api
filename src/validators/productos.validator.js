import { body } from "express-validator";

export const validarProductos = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),

  body("precio").isFloat({ min: 0.01 }).withMessage("El precio debe ser mayor que 0"),

  body("stock").isInt({ min: 0 }).withMessage("El stock no puede ser negativo"),

  body("categoria_id").isInt().withMessage("La categoría es obligatoria"),

  body("descripcion").notEmpty().withMessage("La descripcion es obligatoria")
];
