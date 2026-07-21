import {
  obtenerPedidosService,
  buscarPedidoPorIdService,
  actualizarPedidoService,
  eliminarPedidoService,
} from "../services/pedidos.service.js";
import { crearPedidoService } from "../services/pedidos.service.js";

export const obtenerPedidos = async (req, res, next) => {
  try {
    const pedidos = await obtenerPedidosService();

    res.json(pedidos);
  } catch (error) {
    next(error);
  }
};

export const obtenerPedidoPorId = async (req, res, next) => {
  try {
    const pedido = await buscarPedidoPorIdService(req.params.id);

    res.json(pedido);
  } catch (error) {
    next(error);
  }
};

export const crearPedido = async (req, res, next) => {
  try {
    const { usuario_id, estado, productos } = req.body;

    const pedido = await crearPedidoService(usuario_id, estado, productos);

    res.status(201).json({
      mensaje: "Pedido creado correctamente",
      pedido,
    });
  } catch (error) {
    next(error);
  }
};

export const actualizarPedido = async (req, res, next) => {
  try {
    const { usuario_id, fecha, total, estado } = req.body;

    const pedido = await actualizarPedidoService(
      usuario_id,
      fecha,
      total,
      estado,
      req.params.id,
    );

    res.json(pedido);
  } catch (error) {
    next(error);
  }
};

export const eliminarPedido = async (req, res, next) => {
  try {
    const pedido = await eliminarPedidoService(req.params.id);

    res.json({
      mensaje: "Pedido eliminado",
      pedido,
    });
  } catch (error) {
    next(error);
  }
};
