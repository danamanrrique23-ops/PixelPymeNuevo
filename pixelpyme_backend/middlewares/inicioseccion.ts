import { Context, Next } from "@oak/oak";
import { VerificarToken } from "../utils/jwt.ts";

// Verifica que el usuario esté logueado (token válido)
export const verificarSesion = async (ctx: Context, next: Next) => {
  const authHeader = ctx.request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    ctx.response.status = 401;
    ctx.response.body = { message: "No se proporcionó un token de acceso" };
    return;
  }

  const token = authHeader.split(" ")[1]; 

  try {
    const payload = await VerificarToken(token);
    // Guardamos los datos del usuario en el contexto para usarlos después
    ctx.state.usuario = payload;
    await next();
  } catch {
    ctx.response.status = 401;
    ctx.response.body = { message: "Token inválido o expirado" };
  }
};

// Verifica que el usuario tenga uno de los roles permitidos
export const verificarRol = (rolesPermitidos: string[]) => {
  return async (ctx: Context, next: Next) => {
    const usuario = ctx.state.usuario;

    if (!usuario || !rolesPermitidos.includes(usuario.rol)) {
      ctx.response.status = 403;
      ctx.response.body = { message: "No tenés permisos para realizar esta acción" };
      return;
    }

    await next();
  };
};