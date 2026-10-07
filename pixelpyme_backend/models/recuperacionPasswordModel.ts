import client from "../utils/db.ts";

export async function guardarTokenRecuperacion(
  idUsuario: number,
  token: string,
  fechaExpiracion: Date
) {
  const resultado = await client.query(
    `INSERT INTO recuperacion_password
    (id_usuario, token, fecha_expiracion, usado)
    VALUES (?, ?, ?, FALSE)`,
    [idUsuario, token, fechaExpiracion]
  );

  return resultado;
}

export async function buscarTokenRecuperacion(token: string) {
  const resultado = await client.query(
    `SELECT *
     FROM recuperacion_password
     WHERE token = ?
     AND usado = FALSE
     AND fecha_expiracion > NOW()`,
    [token]
  );

  return resultado;
}

export async function marcarTokenUsado(token: string) {
  const resultado = await client.query(
    `UPDATE recuperacion_password
     SET usado = TRUE
     WHERE token = ?`,
    [token]
  );

  return resultado;
}

