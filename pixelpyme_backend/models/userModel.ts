import client from "../utils/db.ts";

export interface Usuario {
  id_usuario?: number;
  nombres: string;
  apellidos: string;
  email: string;
 password : string;
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
  console.log("1. Entró a registrarUsuario");

  const datos = [
    nombres,
    apellidos,
    email,
    password,
    "usuario"
  ];

  console.log("2. Datos para INSERT:", datos);

  const resultado = await client.query(
    `INSERT INTO usuarios
    (nombres, apellidos, email, password, rol)
    VALUES (?, ?, ?, ?, ?)`,
    datos
  );

  console.log("3. INSERT terminado:", resultado);

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
    [
      nombres,
      apellidos,
      email,
      "",
      "usuario"
    ]
  );

  return resultado;
}