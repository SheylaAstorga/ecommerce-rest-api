import {Router} from 'express';
import {
  obtenerDetallesPedidos,
  obtenerDetallePedidoPorId,
  crearDetallePedido,
  actualizarDetallePedido,
  eliminarDetallePedido,
} from '../controllers/detalle_pedido.controller.js';
import { verificarRol, verificarToken } from '../middlewares/auth.middleware.js';
import { validarDetallePedido } from '../validators/detalle_pedido.validator.js';
import { validarCampos } from '../middlewares/validarCampos.js';

const router = Router();

/**
 * @swagger
 * /detalle_pedido:
 *   get:
 *     summary: Obtener todos los detalles de pedidos
 *     tags:
 *       - Detalle Pedido
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de detalles de pedidos obtenida correctamente
 *         content:
 *            application/json:
 *               schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/DetallePedido'
 *       401:
 *         description: Token inválido o no enviado
 *       403:
 *         description: No tiene permisos para consultar detalles de pedidos
 */
router.get('/',verificarToken,verificarRol("admin"), obtenerDetallesPedidos);
/**
 * @swagger
 * /detalle_pedido/{id}:
 *   get:
 *     summary: Obtener un detalle de pedido por ID
 *     tags:
 *       - Detalle Pedido
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle del pedido
 *     responses:
 *       200:
 *         description: Detalle de pedido encontrado correctamente
 *         content:
 *           application/json:
 *              schema:
 *                  $ref: '#/components/schemas/DetallePedido' 
 *       401:
 *         description: Token inválido o no enviado
 *       403:
 *         description: No tiene permisos para consultar detalles de pedidos
 *       404:
 *         description: Detalle de pedido no encontrado
 */
router.get('/:id',verificarToken,verificarRol("admin"), obtenerDetallePedidoPorId);
/**
 * @swagger
 * /detalle_pedido:
 *   post:
 *     summary: Crear un detalle de pedido
 *     tags:
 *       - Detalle Pedido
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DetallePedidoCrear'
 *     responses:
 *       201:
 *         description: Detalle de pedido creado correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Token inválido o no enviado
 *       404:
 *         description: Pedido o producto no encontrado
 */
router.post('/',verificarToken,validarDetallePedido,validarCampos, crearDetallePedido);
/**
 * @swagger
 * /detalle_pedido/{id}:
 *   put:
 *     summary: Actualizar un detalle de pedido
 *     tags:
 *       - Detalle Pedido
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle del pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DetallePedidoCrear'
 *     responses:
 *       200:
 *         description: Detalle de pedido actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Token inválido o no enviado
 *       403:
 *         description: No tiene permisos para actualizar detalles de pedidos
 *       404:
 *         description: Detalle de pedido no encontrado
 */
router.put('/:id',verificarToken,verificarRol("admin"),validarDetallePedido,validarCampos, actualizarDetallePedido);
/**
 * @swagger
 * /detalle_pedido/{id}:
 *   delete:
 *     summary: Eliminar un detalle de pedido
 *     tags:
 *       - Detalle Pedido
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle del pedido
 *     responses:
 *       200:
 *         description: Detalle de pedido eliminado correctamente
 *       401:
 *         description: Token inválido o no enviado
 *       403:
 *         description: No tiene permisos para eliminar detalles de pedidos
 *       404:
 *         description: Detalle de pedido no encontrado
 */
router.delete('/:id',verificarToken,verificarRol("admin"), eliminarDetallePedido);

export default router;