import pool from "../config/db.js";

export const obtenerTodosLosPedidos = async () => {
  const result = await pool.query("SELECT * FROM pedidos");
  return result.rows;
};

export const buscarPedidoPorId = async (id) => {
  const result = await pool.query("SELECT * FROM pedidos WHERE id = $1", [id]);
  return result.rows[0];
};

export const insertarPedido = async (client,usuario_id, fecha, total, estado) => {
  const result = await client.query(
    `INSERT INTO pedidos
        (usuario_id, fecha, total, estado)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
    [usuario_id, fecha, total, estado],
  );

  return result.rows[0];
};

export const actualizarPedidoPorId = async (
  usuario_id,
  fecha,
  total,
  estado,
  id,
) => {
  const result = await pool.query(
    "UPDATE pedidos SET usuario_id = $1, fecha = $2, total = $3, estado = $4 WHERE id = $5 RETURNING *",
    [usuario_id, fecha, total, estado, id],
  );
  return result.rows[0];
};

export const eliminarPedidoPorId = async (id) => {
  const result = await pool.query(
    "DELETE FROM pedidos WHERE id = $1 RETURNING *",
    [id],
  );
  return result.rows[0];
};

export const actualizarTotalPedido = async (client, id, total) => {
  const result = await client.query(
    "UPDATE pedidos SET total = $1 WHERE id = $2 RETURNING *",
    [total, id]
  );

  return result.rows[0];
};