import { Context } from "@oak/oak";

import {
  crearSolicitud,
  buscarSolicitudesPorUsuario
} from "../models/solicitudModel.ts";

// =====================================
// CREAR SOLICITUD
// =====================================

export async function registrarSolicitud(ctx: Context) {

  try {

    const body = await ctx.request.body.json();

    const {
      usuario_id,
      producto_id,
      asunto,
      descripcion
    } = body;

    // VALIDAR DATOS

    if (
      !usuario_id ||
      !asunto ||
      !descripcion
    ) {

      ctx.response.status = 400;

      ctx.response.body = {
        mensaje: "Usuario, asunto y descripción son obligatorios"
      };

      return;
    }

    // CREAR SOLICITUD

    await crearSolicitud({
      id_usuario: usuario_id,
      id_producto: producto_id ?? null,
      asunto,
      descripcion
    });

    ctx.response.status = 201;

    ctx.response.body = {
      mensaje: "Solicitud creada correctamente"
    };

  } catch (error) {

    console.error(
      "Error al crear solicitud:",
      error
    );

    ctx.response.status = 500;

    ctx.response.body = {
      mensaje: "Error interno del servidor"
    };

  }

}

// =====================================
// CONSULTAR SOLICITUDES DEL USUARIO
// =====================================

export async function obtenerSolicitudesUsuario(
  ctx: RouterContext<"/api/solicitudes/usuario/:id">
) {

  try {

    const usuario_id = Number(ctx.params.id);

    if (!usuario_id) {

      ctx.response.status = 400;

      ctx.response.body = {
        mensaje: "ID de usuario inválido"
      };

      return;
    }

    const solicitudes =
      await buscarSolicitudesPorUsuario(usuario_id);

    ctx.response.status = 200;

    ctx.response.body = solicitudes;

  } catch (error) {

    console.error(
      "Error al obtener solicitudes:",
      error
    );

    ctx.response.status = 500;

    ctx.response.body = {
      mensaje: "Error interno del servidor"
    };

  }
}