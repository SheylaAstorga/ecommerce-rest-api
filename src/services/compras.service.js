import { buscarUsuarioPorId } from "../models/usuarios.model.js";
import { buscarProductoPorId } from "../models/productos.model.js";
import { insertarPedido } from "../models/pedidos.model.js";
import { actualizarStockProducto } from "../models/productos.model.js";
import pool from "../config/db.js";
import AppError from "../utils/AppError.js";
import { insertarDetallePedidoTransaccion } from "./detalle_pedido.service.js";


export const crearCompra = async (datosCompra) => {
  const client = await pool.connect(); // Usamos el cliente proporcionado para la transacción

  try {
    await client.query("BEGIN"); // Iniciamos la transacción
    const { usuario_id, productos } = datosCompra;

    // Variable para ir acumulando el total del pedido
    let total = 0;

    // ===========================
    // 1. Verificar usuario
    // ===========================
    const usuario = await buscarUsuarioPorId(client, usuario_id);

    if (!usuario) {
      throw new AppError("Usuario no encontrado", 404);
    }

    // ===========================
    // 2. Validar productos y calcular total
    // ===========================
    for (const producto of productos) {
      const productoExistente = await buscarProductoPorId(
        client,
        producto.producto_id,
      );

      if (!productoExistente) {
        throw new AppError(
          `Producto con ID ${producto.producto_id} no encontrado`,404
        );
      }

      const nuevoStock = productoExistente.stock - producto.cantidad;

      if (nuevoStock < 0) {
        throw new AppError(
          `Stock insuficiente para el producto ${productoExistente.nombre}`,400
        );
      }

      // Acumular el total del pedido
      total += productoExistente.precio * producto.cantidad;
    }

    // ===========================
    // 3. Crear el pedido
    // ===========================
    const pedido = await insertarPedido(
      client,
      usuario_id,
      new Date(),
      total,
      "Pendiente",
    );

    for (const producto of productos) {
      const productoExistente = await buscarProductoPorId(
        client,
        producto.producto_id,
      );
      await insertarDetallePedidoTransaccion(
        client,
        pedido.id,
        producto.producto_id,
        producto.cantidad,
        productoExistente.precio,
      );
      const nuevoStock = productoExistente.stock - producto.cantidad;
      await actualizarStockProducto(client, producto.producto_id, nuevoStock);
    }
    
    await client.query("COMMIT"); // Confirmamos la transacción
    
    return {
      mensaje: "Compra realizada correctamente",
      pedido,
    }; // Retornamos el pedido creado


  } catch (error) {
    await client.query("ROLLBACK"); // Revertimos la transacción
    throw error;
  } finally {
    client.release(); // Liberamos el cliente
  }
};
