import AppError from "../utils/AppError.js";

import {
  obtenerTodosLosDetallesPedidos,
  buscarDetallePedidoPorId,
  insertarDetallePedido,
  actualizarDetallePedidoPorId,
  eliminarDetallePedidoPorId,
} from "../models/detalle_pedido.model.js";


export const obtenerDetallesPedidosService = async () => {
  return await obtenerTodosLosDetallesPedidos();
};


export const buscarDetallePedidoPorIdService = async (id) => {

  const detalle = await buscarDetallePedidoPorId(id);

  if (!detalle) {
    throw new AppError(
      "Detalle de pedido no encontrado",
      404
    );
  }

  return detalle;
};


export const crearDetallePedidoService = async (
  pedido_id,
  producto_id,
  cantidad,
  precio_unitario
) => {

  const detalle = await insertarDetallePedido(
    pedido_id,
    producto_id,
    cantidad,
    precio_unitario
  );

  return detalle;
};


export const actualizarDetallePedidoService = async (
  pedido_id,
  producto_id,
  cantidad,
  precio_unitario,
  id
) => {

  const detalle = await actualizarDetallePedidoPorId(
    pedido_id,
    producto_id,
    cantidad,
    precio_unitario,
    id
  );


  if (!detalle) {
    throw new AppError(
      "Detalle de pedido no encontrado",
      404
    );
  }


  return detalle;
};


export const eliminarDetallePedidoService = async (id) => {

  const detalle = await eliminarDetallePedidoPorId(id);


  if (!detalle) {
    throw new AppError(
      "Detalle de pedido no encontrado",
      404
    );
  }


  return detalle;
};

export const insertarDetallePedidoTransaccion = async (
  client,
  pedido_id,
  producto_id,
  cantidad,
  precio_unitario
) => {

  const result = await client.query(
    `INSERT INTO detalle_pedido
    (pedido_id, producto_id, cantidad, precio_unitario)
    VALUES ($1,$2,$3,$4)
    RETURNING *`,
    [
      pedido_id,
      producto_id,
      cantidad,
      precio_unitario
    ]
  );

  return result.rows[0];
};