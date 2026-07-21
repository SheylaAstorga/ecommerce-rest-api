import pool from "../config/db.js";

export const obtenerTodosLosUsuarios = async () => {
  const result = await pool.query("SELECT * FROM usuarios");
  return result.rows;
};

export const buscarUsuarioPorId = async (id) => {
  const result = await pool.query(
    "SELECT * FROM usuarios WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

export const insertarUsuario = async (
  nombre,
  apellido,
  email,
  telefono,
  password
) => {
  const result = await pool.query(
    `INSERT INTO usuarios
    (nombre, apellido, email, telefono,password)
    VALUES ($1, $2, $3, $4,$5)
    RETURNING *`,
    [nombre, apellido, email, telefono, password]
  );

  return result.rows[0];
};

export const actualizarUsuarioPorId = async (
  nombre,
  apellido,
  email,
  telefono,
  id
) => {
  const result = await pool.query(
    `UPDATE usuarios
    SET nombre = $1,
        apellido = $2,
        email = $3,
        telefono = $4
    WHERE id = $5
    RETURNING *`,
    [nombre, apellido, email, telefono, id]
  );

  return result.rows[0];
};

export const eliminarUsuarioPorId = async (id) => {
  const result = await pool.query(
    "DELETE FROM usuarios WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};


export const buscarUsuarioPorEmail = async (email) => {

    const result = await pool.query(
        "SELECT * FROM usuarios WHERE email = $1",
        [email]
    );

    return result.rows[0];
}