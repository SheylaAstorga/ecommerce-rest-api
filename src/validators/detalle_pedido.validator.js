import { body } from "express-validator";

export const validarDetallePedido = [
  body("pedido_id").isInt().withMessage("El pedido es obligatorio"),

  body("producto_id").isInt().withMessage("El producto es obligatorio"),

  body("cantidad")
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser mayor que 0"),

  body("precio_unitario")
    .isFloat({ min: 0.01 })
    .withMessage("El precio unitario debe ser mayor que 0"),
];
