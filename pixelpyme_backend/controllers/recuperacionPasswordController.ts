import { buscarUsuarioPorEmail } from "../models/userModel.ts";

import {
  guardarTokenRecuperacion,
  buscarTokenRecuperacion
} from "../models/recuperacionPasswordModel.ts";

interface ContextoRecuperacion {
  request: {
    body: {
      json(): Promise<{
        email?: string;
        token?: string;
      }>;
    };
  };
  response: {
    status: number;
    body: unknown;
  };
}

// SOLICITAR RECUPERACIÓN
export async function solicitarRecuperacion(
  ctx: ContextoRecuperacion
) {
  try {
    const body = await ctx.request.body.json();

    const email = body.email;

    if (!email) {
      ctx.response.status = 400;
      ctx.response.body = {
        mensaje: "El correo electrónico es obligatorio"
      };
      return;
    }

    // Buscar usuario por correo
    const resultado = await buscarUsuarioPorEmail(email);

    if (!resultado || resultado.length === 0) {
      ctx.response.status = 404;
      ctx.response.body = {
        mensaje: "No existe un usuario con ese correo"
      };
      return;
    }

    const usuario = resultado[0];

    // Generar un código de 6 dígitos
    const token = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // El código tendrá una duración de 15 minutos
    const fechaExpiracion = new Date(
      Date.now() + 15 * 60 * 1000
    );

    // Guardar código en la base de datos
    await guardarTokenRecuperacion(
      usuario.id_usuario,
      token,
      fechaExpiracion
    );

    console.log("================================");
    console.log("CÓDIGO DE RECUPERACIÓN:", token);
    console.log("CORREO:", email);
    console.log("================================");

    ctx.response.status = 200;
    ctx.response.body = {
      mensaje: "Código de recuperación generado correctamente"
    };

  } catch (error) {
    console.error("Error en recuperación:", error);

    ctx.response.status = 500;
    ctx.response.body = {
      mensaje: "Error interno del servidor"
    };
  }
}

// VERIFICAR CÓDIGO
export async function verificarCodigoRecuperacion(
  ctx: ContextoRecuperacion
) {
  try {
    const body = await ctx.request.body.json();

    const token = body.token;

    if (!token) {
      ctx.response.status = 400;
      ctx.response.body = {
        mensaje: "El código es obligatorio"
      };
      return;
    }

    const resultado = await buscarTokenRecuperacion(token);

    if (!resultado || resultado.length === 0) {
      ctx.response.status = 400;
      ctx.response.body = {
        mensaje: "El código es incorrecto o ha expirado"
      };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = {
      mensaje: "Código verificado correctamente"
    };

  } catch (error) {
    console.error("Error verificando código:", error);

    ctx.response.status = 500;
    ctx.response.body = {
      mensaje: "Error interno del servidor"
    };
  }
}