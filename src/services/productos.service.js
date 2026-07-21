import AppError from "../utils/AppError.js";
import {
  obtenerTodosLosProductos,
  buscarProductoPorId,
  insertarProducto,
  actualizarProductoPorId,
  eliminarProductoPorId
} from "../models/productos.model.js";


export const obtenerProductosService = async () =>{
    return await obtenerTodosLosProductos();
}

export const buscarProductosPorIdService = async(id) =>{
    const producto = await buscarProductoPorId (id);

    if(!producto){
        throw new AppError("Producto no encontrado", 404);
    }

    return producto;
}

export const crearProductoService = async (nombre,descripcion, precio,stock,categoria_id) =>{
    const producto = await insertarProducto (nombre,descripcion, precio,stock,categoria_id);
    return producto;
}


export const actualizarProductoService = async (nombre,descripcion,precio,stock,categoria_id,id) =>{
    const producto = await actualizarProductoPorId (nombre,descripcion,precio,stock,categoria_id,id);
    if(!producto){
        throw new AppError ("Producto no encontrado",404)
    }
    return producto;

}

export const eliminarProductoService = async(id)=>{
    const producto = await eliminarProductoPorId (id);
      if (!producto) {
    throw new AppError("Producto no encontrado", 404);
  }
  return producto;
}

