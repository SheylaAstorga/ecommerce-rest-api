import {
  obtenerDetallesPedidosService,
  buscarDetallePedidoPorIdService,
  crearDetallePedidoService,
  actualizarDetallePedidoService,
  eliminarDetallePedidoService,
} from "../services/detalle_pedido.service.js";

export const obtenerDetallesPedidos = async (req, res, next) => {
  try {
    const detalles = await obtenerDetallesPedidosService();

    res.json(detalles);
  } catch (error) {
    next(error);
  }
};

export const obtenerDetallePedidoPorId = async (req, res, next) => {
  try {
    const detalle = await buscarDetallePedidoPorIdService(req.params.id);

    res.json(detalle);
  } catch (error) {
    next(error);
  }
};

export const crearDetallePedido = async (req, res, next) => {
  try {
    const { pedido_id, producto_id, cantidad, precio_unitario } = req.body;

    const detalle = await crearDetallePedidoService(
      pedido_id,
      producto_id,
      cantidad,
      precio_unitario,
    );

    res.status(201).json(detalle);
  } catch (error) {
    next(error);
  }
};

export const actualizarDetallePedido = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { pedido_id, producto_id, cantidad, precio_unitario } = req.body;

    const detalle = await actualizarDetallePedidoService(
      pedido_id,
      producto_id,
      cantidad,
      precio_unitario,
      id,
    );

    res.json(detalle);
  } catch (error) {
    next(error);
  }
};

export const eliminarDetallePedido = async (req, res, next) => {
  try {
    const detalle = await eliminarDetallePedidoService(req.params.id);

    res.json({
      mensaje: "Detalle de pedido eliminado",
      detalle,
    });
  } catch (error) {
    next(error);
  }
};
