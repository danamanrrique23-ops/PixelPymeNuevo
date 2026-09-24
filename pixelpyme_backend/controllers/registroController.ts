import type { Context } from "../Dependencies/dependencias.ts";

import {
  buscarUsuarioPorEmail,
  registrarUsuario
} from "../models/userModel.ts";

import { hashPassword } from "../utils/hash.ts";

export async function postRegistro(ctx: Context) {
  const { request, response } = ctx;

  try {
    const datosRegistro = await request.body.json();

    console.log("Datos recibidos:", datosRegistro);

    const { nombres, apellidos, email, password } = datosRegistro;

    console.log("Tipos:", {
      nombres: typeof nombres,
      apellidos: typeof apellidos,
      email: typeof email,
      password: typeof password
    });

    if (!nombres || !apellidos || !email || !password) {
      response.status = 400;
      response.body = {
        Message: "Todos los campos son obligatorios"
      };
      return;
    }

    const usuarioExistente = await buscarUsuarioPorEmail(email);

    if (usuarioExistente.length > 0) {
      response.status = 409;
      response.body = {
        Message: "El correo ya está registrado"
      };
      return;
    }

    // Encriptar la contraseña
    const passwordHash = await hashPassword(password);

    const resultado = await registrarUsuario(
      nombres,
      apellidos,
      email,
      passwordHash
    );

    console.log("Resultado INSERT:", resultado);

    response.status = 201;
    response.body = {
      Message: "Usuario registrado correctamente",
      resultado: resultado
    };

  } catch (error) {
    console.error("Error en el registro:", error);

    response.status = 500;
    response.body = {
      Message: "Error interno del servidor"
    };
  }
}