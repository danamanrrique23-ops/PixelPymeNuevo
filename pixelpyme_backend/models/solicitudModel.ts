import db from "../utils/db.ts";

export interface Solicitud {
  id_solicitud?: number;
  id_usuario: number;
  id_producto?: number;
  asunto: string;
  descripcion: string;
  fecha?: Date;
  estado?: string;
}


// =====================================
// CREAR SOLICITUD
// =====================================

export async function crearSolicitud(
  solicitud: Solicitud
) {

  const resultado = await db.execute(
    `
    INSERT INTO solicitudes
    (
      id_usuario,
      id_producto,
      asunto,
      descripcion
    )
    VALUES (?, ?, ?, ?)
    `,
    [
      solicitud.id_usuario,
      solicitud.id_producto ?? null,
      solicitud.asunto,
      solicitud.descripcion
    ]
  );

  return resultado;
}


// =====================================
// BUSCAR SOLICITUDES DE UN USUARIO
// =====================================

export async function buscarSolicitudesPorUsuario(
  id_usuario: number
) {

  const resultado = await db.query(
    `
    SELECT
      id_solicitud,
      id_usuario,
      id_producto,
      asunto,
      descripcion,
      fecha,
      estado
    FROM solicitudes
    WHERE id_usuario = ?
    ORDER BY fecha DESC
    `,
    [id_usuario]
  );

  return resultado;
}