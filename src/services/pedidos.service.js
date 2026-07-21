import AppError from "../utils/AppError.js";
import pool from "../config/db.js";
import {
  obtenerTodosLosPedidos,
  buscarPedidoPorId,
  actualizarPedidoPorId,
  eliminarPedidoPorId,
  actualizarTotalPedido,
} from "../models/pedidos.model.js";
import { insertarPedido } from "../models/pedidos.model.js";
import { insertarDetallePedido } from "../models/detalle_pedido.model.js";
import { buscarProductoPorId,actualizarStockProducto } from "../models/productos.model.js";

export const obtenerPedidosService = async () => {
  return await obtenerTodosLosPedidos();
};

export const buscarPedidoPorIdService = async (id) => {
  const pedido = await buscarPedidoPorId(id);

  if (!pedido) {
    throw new AppError("Pedido no encontrado", 404);
  }

  return pedido;
};

export const actualizarPedidoService = async (
  usuario_id,
  fecha,
  total,
  estado,
  id,
) => {
  const pedido = await actualizarPedidoPorId(
    usuario_id,
    fecha,
    total,
    estado,
    id,
  );

  if (!pedido) {
    throw new AppError("Pedido no encontrado", 404);
  }

  return pedido;
};

export const eliminarPedidoService = async (id) => {
  const pedido = await eliminarPedidoPorId(id);

  if (!pedido) {
    throw new AppError("Pedido no encontrado", 404);
  }

  return pedido;
};

export const crearPedidoService = async (usuario_id, estado, productos) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    let total = 0;

    const pedido = await insertarPedido(
      client,
      usuario_id,
      new Date(),
      total,
      estado,
    );

    for (const item of productos) {
      const producto = await buscarProductoPorId(item.producto_id);
      if (!producto) {
        throw new AppError(`Producto ${item.producto_id} no encontrado`, 404);
      }

      if (producto.stock < item.cantidad) {
        throw new AppError(`Stock insuficiente para ${producto.nombre}`, 400);
      }

      const subtotal = producto.precio * item.cantidad;

      total += subtotal;
      await insertarDetallePedido(
        client,
        pedido.id,
        producto.id,
        item.cantidad,
        producto.precio,
      );
      const nuevoStock = producto.stock - item.cantidad;

      await actualizarStockProducto(client, producto.id, nuevoStock);
    }
    const pedidoActualizado = await actualizarTotalPedido(
      client,
      pedido.id,
      total,
    );

    await client.query("COMMIT");

    return pedidoActualizado;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
