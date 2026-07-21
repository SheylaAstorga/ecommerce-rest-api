import pool from "../config/db.js";

export const obtenerTodosLosProductos = async () => {
    const result = await pool.query("SELECT p.id, p.nombre, p.descripcion, p.precio,p.stock, c.nombre AS categoria FROM productos p JOIN categorias c ON p.categoria_id = c.id");
    return result.rows;
};

export const buscarProductoPorId = async(id) =>{
    const result = await pool.query ("SELECT p.id, p.nombre, p.descripcion, p.precio, p.stock, c.nombre AS categoria FROM productos p JOIN categorias c ON p.categoria_id = c.id WHERE p.id = $1", [id]);
    return result.rows[0];
}

export const insertarProducto = async(nombre, descripcion,precio,stock,categoria_id) =>{
    const result = await pool.query("INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id) VALUES ($1, $2, $3, $4, $5) RETURNING *", [nombre, descripcion, precio, stock, categoria_id]);
    return result.rows[0];
}

export const actualizarProductoPorId = async(nombre, descripcion, precio, stock, categoria_id, id) =>{
    const result = await pool.query("UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, stock = $4, categoria_id = $5 WHERE id = $6 RETURNING *", [nombre, descripcion, precio, stock, categoria_id, id]);
    return result.rows[0];
}

export const eliminarProductoPorId = async(id) =>{
    const result = await pool.query("DELETE FROM productos WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
}

export const actualizarStockProducto = async(client,id, nuevoStock) =>{
    const result = await client.query("UPDATE productos SET stock = $1 WHERE id = $2 RETURNING *", [nuevoStock, id]);
    return result.rows[0];
}