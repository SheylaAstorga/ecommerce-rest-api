import {
  obtenerCategoriasService,
  buscarCategoriaPorIdService,
  crearCategoriaService,
  actualizarCategoriaService,
  eliminarCategoriaService,
} from "../services/categorias.service.js";


export const obtenerCategorias = async (req, res, next) => {
  try {
    const categorias = await obtenerCategoriasService();
    res.json(categorias);
  } catch (error) {
    next(error);
  }
};


export const obtenerCategoriaPorId = async (req, res, next) => {
  try {
    const categoria = await buscarCategoriaPorIdService(req.params.id);
    res.json(categoria);
  } catch (error) {
    next(error);
  }
};


export const crearCategoria = async (req, res, next) => {
  try {
    const { nombre, descripcion } = req.body;

    const categoria = await crearCategoriaService(
      nombre,
      descripcion
    );

    res.status(201).json(categoria);

  } catch (error) {
    next(error);
  }
};


export const actualizarCategoria = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    const categoria = await actualizarCategoriaService(
      nombre,
      descripcion,
      id
    );

    res.json(categoria);

  } catch (error) {
    next(error);
  }
};


export const eliminarCategoria = async (req, res, next) => {
  try {
    const categoria = await eliminarCategoriaService(req.params.id);

    res.json({
      mensaje: "Categoría eliminada",
      categoria,
    });

  } catch (error) {
    next(error);
  }
};