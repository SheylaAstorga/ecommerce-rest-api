import {
  obtenerProductosService,
  buscarProductosPorIdService,
  crearProductoService,
  actualizarProductoService,
  eliminarProductoService,
} from "../services/productos.service.js";

export const obtenerProductos = async (req, res, next) => {
  try {
    const producto = await obtenerProductosService();
    res.json(producto);
  } catch (error) {
    next(error);
  }
};

export const obtenerProductosPorId = async (req, res, next) => {
  try {
    const producto = await buscarProductosPorIdService(req.params.id);
    res.json(producto);
  } catch (error) {
    next(error);
  }
};

export const crearProducto = async (req, res, next) => {
  try {
    const {nombre, descripcion, precio, stock, categoria_id} = req.body;

    const producto = await crearProductoService(
      nombre, descripcion, precio, stock, categoria_id
    );

    res.status(201).json(producto);
  } catch (error) {
    next(error);
  }
};

export const actualizarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, categoria_id } = req.body;

    const producto = await actualizarProductoService(
     nombre, descripcion, precio, stock, categoria_id,id
    );

    res.json(producto);
  } catch (error) {
    next(error);
  }
};

export const eliminarProducto = async (req, res, next) => {
  try {
    const producto = await eliminarProductoService(req.params.id);

    res.json({
      mensaje: "Producto eliminado",
      producto,
    });
  } catch (error) {
    next(error);
  }
};
