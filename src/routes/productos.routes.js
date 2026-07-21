import { Router } from "express";
import {
  obtenerProductos,
  obtenerProductosPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../controllers/productos.controller.js";
import {
  verificarRol,
  verificarToken,
} from "../middlewares/auth.middleware.js";
import { validarProductos } from "../validators/productos.validator.js";
import { validarCampos } from "../middlewares/validarCampos.js";

const router = Router();

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtener todos los productos
 *     tags:
 *       - Productos
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *             application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Producto'
 */

router.get("/", obtenerProductos);
/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtener un producto por su ID
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Producto'
 *       404:
 *         description: Producto no encontrado
 */
router.get("/:id", obtenerProductosPorId);
/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags:
 *       - Productos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductoCrear'
 *     responses:
 *       201:
 *         description: Producto creado correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Token inválido o no enviado
 *       403:
 *         description: No tiene permisos para crear productos
 */
router.post(
  "/",
  verificarToken,
  verificarRol("admin"),
  validarProductos,
  validarCampos,
  crearProducto,
);
/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     tags:
 *       - Productos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/ProductoCrear' 
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Token inválido o no enviado
 *       403:
 *         description: No autorizado
 *       404:
 *         description: Producto no encontrado
 */
router.put(
  "/:id",
  verificarToken,
  verificarRol("admin"),
  validarProductos,
  validarCampos,
  actualizarProducto,
);
/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags:
 *       - Productos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *       401:
 *         description: Token inválido o no enviado
 *       403:
 *         description: No tiene permisos para eliminar productos
 *       404:
 *         description: Producto no encontrado
 */
router.delete("/:id", verificarToken, verificarRol("admin"), eliminarProducto);

export default router;
