import { Router } from "express";

import {
  obtenerPedidos,
  obtenerPedidoPorId,
  crearPedido,
  actualizarPedido,
  eliminarPedido,
} from "../controllers/pedidos.controller.js";
import {
  verificarRol,
  verificarToken,
} from "../middlewares/auth.middleware.js";
import { validarPedidos } from "../validators/pedidos.validator.js";
import { validarCampos } from "../middlewares/validarCampos.js";

const router = Router();

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Obtener todos los pedidos
 *     tags:
 *       - Pedidos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos obtenida correctamente
 *         content:
 *             application/json:
 *                schema:
 *                    type: array
 *                    items:
 *                        $ref: '#/components/schemas/Pedido'
 *       401:
 *         description: Token inválido o no enviado
 *       403:
 *         description: No tiene permisos para consultar pedidos
 */
router.get(
  "/",
  verificarToken,
  verificarRol("admin"),
  validarCampos,
  obtenerPedidos,
);
/**
 * @swagger
 * /pedidos/{id}:
 *   get:
 *     summary: Obtener un pedido por su ID
 *     tags:
 *       - Pedidos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pedido
 *     responses:
 *       200:
 *         description: Pedido encontrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pedido'
 *       401:
 *         description: Token inválido o no enviado
 *       403:
 *         description: No tiene permisos para consultar pedidos
 *       404:
 *         description: Pedido no encontrado
 */
router.get(
  "/:id",
  verificarToken,
  verificarRol("admin"),
  validarCampos,
  obtenerPedidoPorId,
);
/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Crear un nuevo pedido
 *     tags:
 *       - Pedidos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PedidoCrear'
 *     responses:
 *       201:
 *         description: Pedido creado correctamente
 *       400:
 *         description: Datos inválidos o stock insuficiente
 *       401:
 *         description: Token inválido o no enviado
 *       404:
 *         description: Producto no encontrado
 */
router.post("/", verificarToken, validarPedidos, validarCampos, crearPedido);
/**
 * @swagger
 * /pedidos/{id}:
 *   put:
 *     summary: Actualizar un pedido
 *     tags:
 *       - Pedidos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/PedidoActualizar'
 *     responses:
 *       200:
 *         description: Pedido actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Token inválido o no enviado
 *       403:
 *         description: No tiene permisos para actualizar pedidos
 *       404:
 *         description: Pedido no encontrado
 */
router.put(
  "/:id",
  verificarToken,
  verificarRol("admin"),
  validarPedidos,
  validarCampos,
  actualizarPedido,
);
/**
 * @swagger
 * /pedidos/{id}:
 *   delete:
 *     summary: Eliminar un pedido
 *     tags:
 *       - Pedidos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pedido
 *     responses:
 *       200:
 *         description: Pedido eliminado correctamente
 *       401:
 *         description: Token inválido o no enviado
 *       403:
 *         description: No tiene permisos para eliminar pedidos
 *       404:
 *         description: Pedido no encontrado
 */
router.delete("/:id", verificarToken, verificarRol("admin"), eliminarPedido);

export default router;
