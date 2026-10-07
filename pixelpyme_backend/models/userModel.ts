import client from "../utils/db.ts";

export interface Usuario {
  id_usuario?: number;
  nombres: string;
  apellidos: string;
  email: string;
  password: string;
  rol: string;
}

// BUSCAR USUARIO POR CORREO
export async function buscarUsuarioPorEmail(email: string) {
  const resultado = await client.query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email]
  );

  return resultado;
}

// REGISTRAR USUARIO
export async function registrarUsuario(
  nombres: string,
  apellidos: string,
  email: string,
  password: string
) {
  const datos = [nombres, apellidos, email, password, "Usuario"];

  const resultado = await client.query(
    `INSERT INTO usuarios
    (nombres, apellidos, email, password, rol)
    VALUES (?, ?, ?, ?, ?)`,
    datos
  );

  return resultado;
}

// REGISTRAR USUARIO DESDE GOOGLE
export async function registrarUsuarioGoogle(
  nombres: string,
  apellidos: string,
  email: string
) {
  const resultado = await client.query(
    `INSERT INTO usuarios
    (nombres, apellidos, email, password, rol)
    VALUES (?, ?, ?, ?, ?)`,
    [nombres, apellidos, email, "", "Usuario"]
  );

  return resultado;
}
// Lista los clientes, sin la contraseña
export const listarClientes = async () => {
  const resultado = await client.query(
    `SELECT id_usuario, nombres, apellidos, email
     FROM usuarios
     WHERE rol = 'Usuario'
     ORDER BY id_usuario DESC`
  );
  return resultado;
};

// Crea un cliente (el rol siempre queda fijo como 'Usuario')
export const crearCliente = async (
  nombres: string,
  apellidos: string,
  email: string,
  passwordHash: string,
) => {
  return await client.execute(
    `INSERT INTO usuarios (nombres, apellidos, email, password, rol)
     VALUES (?, ?, ?, ?, 'Usuario')`,
    [nombres, apellidos, email, passwordHash],
  );
};

// Actualiza un cliente; si no llega contraseña nueva, no se toca la actual
export const actualizarCliente = async (
  id: number,
  nombres: string,
  apellidos: string,
  email: string,
  passwordHash?: string,
) => {
  if (passwordHash) {
    return await client.execute(
      `UPDATE usuarios SET nombres = ?, apellidos = ?, email = ?, password = ?
       WHERE id_usuario = ? AND rol = 'Usuario'`,
      [nombres, apellidos, email, passwordHash, id],
    );
  }
  return await client.execute(
    `UPDATE usuarios SET nombres = ?, apellidos = ?, email = ?
     WHERE id_usuario = ? AND rol = 'Usuario'`,
    [nombres, apellidos, email, id],
  );
};

// Cuenta solo los usuarios con rol 'Usuario' (los administradores no son clientes)
export const contarClientes = async () => {
  const resultado = await client.query(
    "SELECT COUNT(*) AS total FROM usuarios WHERE rol = 'Usuario'"
  );
  // Number() por si el driver devuelve el conteo como BigInt
  return Number(resultado[0].total);
};

// Elimina un cliente (el AND rol evita borrar administradores por error)
export const eliminarCliente = async (id: number) => {
  return await client.execute(
    `DELETE FROM usuarios WHERE id_usuario = ? AND rol = 'Usuario'`,
    [id],
  );
};