import AppError from "../utils/AppError.js";

import {
  obtenerTodasLasCategorias,
  buscarCategoriaPorId,
  insertarCategoria,
  actualizarCategoriaPorId,
  eliminarCategoriaPorId,
} from "../models/categorias.model.js";


export const obtenerCategoriasService = async () => {
  return await obtenerTodasLasCategorias();
};


export const buscarCategoriaPorIdService = async (id) => {

  const categoria = await buscarCategoriaPorId(id);

  if (!categoria) {
    throw new AppError("Categoría no encontrada", 404);
  }

  return categoria;
};


export const crearCategoriaService = async (
  nombre,
  descripcion
) => {

  const categoria = await insertarCategoria(
    nombre,
    descripcion
  );

  return categoria;
};


export const actualizarCategoriaService = async (
  nombre,
  descripcion,
  id
) => {

  const categoria = await actualizarCategoriaPorId(
    nombre,
    descripcion,
    id
  );

  if (!categoria) {
    throw new AppError("Categoría no encontrada", 404);
  }

  return categoria;
};


export const eliminarCategoriaService = async (id) => {

  const categoria = await eliminarCategoriaPorId(id);

  if (!categoria) {
    throw new AppError("Categoría no encontrada", 404);
  }

  return categoria;
};