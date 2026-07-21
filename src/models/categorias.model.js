import pool from "../config/db.js";

export const obtenerTodasLasCategorias = async () => {
  const result = await pool.query("SELECT * FROM categorias");
  return result.rows;
};

export const buscarCategoriaPorId = async(id)=>{
  const result = await pool.query("SELECT * FROM categorias WHERE id = $1", [id]);
  return result.rows[0];
}

export const insertarCategoria = async(nombre, descripcion)=>{
 const result= await pool.query("INSERT INTO categorias (nombre, descripcion) VALUES($1, $2) RETURNING *", [nombre, descripcion]);
 return result.rows[0];
}

export const actualizarCategoriaPorId = async(nombre, descripcion, id)=>{
    const result = await pool.query("UPDATE categorias SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *",[nombre, descripcion, id]);
    return result.rows[0];
}

export const eliminarCategoriaPorId = async(id)=>{
    const result = await pool.query("DELETE FROM categorias WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
}