import { Router } from "express";
import {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from "../controllers/categorias.controller.js";
import {
  verificarRol,
  verificarToken,
} from "../middlewares/auth.middleware.js";
import { validarCategoriasProductos } from "../validators/categorias.validator.js";
import { validarCampos } from "../middlewares/validarCampos.js";

const router = Router();

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags:
 *       - Categorías
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categoria'
 */
router.get("/", obtenerCategorias);
/**
 * @swagger
 * /categorias/{id}:
 *   get:
 *     summary: Obtener una categoría por ID
 *     tags:
 *       - Categorías
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       404:
 *         description: Categoría no encontrada
 */
router.get("/:id", obtenerCategoriaPorId);
/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Crear una categoría
 *     tags:
 *       - Categorías
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoriaCrear'
 *     responses:
 *       201:
 *         description: Categoría creada correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Token inválido o no enviado
 *       403:
 *         description: No autorizado
 */
router.post(
  "/",
  verificarToken,
  verificarRol("admin"),
  validarCategoriasProductos,
  validarCampos,
  crearCategoria,
);
/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     summary: Actualizar una categoría
 *     tags:
 *       - Categorías
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoriaCrear'
 *     responses:
 *       200:
 *         description: Categoría actualizada correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Token inválido o no enviado
 *       403:
 *         description: No tiene permisos para actualizar categorías
 *       404:
 *         description: Categoría no encontrada
 */
router.put(
  "/:id",
  verificarToken,
  verificarRol("admin"),
  validarCategoriasProductos,
  validarCampos,
  actualizarCategoria,
);
/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Eliminar una categoría
 *     tags:
 *       - Categorías
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría eliminada correctamente
 *       401:
 *         description: Token inválido o no enviado
 *       403:
 *         description: No tiene permisos para eliminar categorías
 *       404:
 *         description: Categoría no encontrada
 */
router.delete("/:id", verificarToken, verificarRol("admin"), eliminarCategoria);

export default router;
