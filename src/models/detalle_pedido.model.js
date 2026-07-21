import pool from "../config/db.js";


export const obtenerTodosLosDetallesPedidos = async () => {
    const result = await pool.query("SELECT dp.id, dp.pedido_id, dp.producto_id, p.nombre AS producto_nombre, dp.cantidad, dp.precio_unitario FROM detalle_pedido dp JOIN productos p ON dp.producto_id = p.id");
    return result.rows;
}

export const buscarDetallePedidoPorId = async (id) => {
    const result = await pool.query("SELECT dp.id, dp.pedido_id, dp.producto_id, p.nombre AS producto_nombre, dp.cantidad, dp.precio_unitario FROM detalle_pedido dp JOIN productos p ON dp.producto_id = p.id WHERE dp.id = $1", [id]);
    return result.rows[0];
}

export const insertarDetallePedido = async (client,pedido_id, producto_id, cantidad, precio_unitario) => {
    const result = await client.query(
        `INSERT INTO detalle_pedido
        (pedido_id, producto_id, cantidad, precio_unitario)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [pedido_id, producto_id, cantidad, precio_unitario]
    );
    return result.rows[0];
}

export const actualizarDetallePedidoPorId = async (pedido_id, producto_id, cantidad, precio_unitario, id) => {
    const result = await pool.query(
        "UPDATE detalle_pedido SET pedido_id = $1, producto_id = $2, cantidad = $3, precio_unitario = $4 WHERE id = $5 RETURNING *",
        [pedido_id, producto_id, cantidad, precio_unitario, id]
    );
    return result.rows[0];
}

export const eliminarDetallePedidoPorId = async (id) => {
    const result = await pool.query(
        "DELETE FROM detalle_pedido WHERE id = $1 RETURNING *",
        [id]
    );
    return result.rows[0];
}

