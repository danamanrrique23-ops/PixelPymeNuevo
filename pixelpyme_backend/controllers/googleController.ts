
import { Context } from "@oak/oak";
import {
  buscarUsuarioPorEmail,
  registrarUsuarioGoogle
} from "../models/userModel.ts";
import { generarToken } from "../utils/jwt.ts";

// Iniciar sesión con Google
export function iniciarGoogle(ctx: Context) {
  const clientId = Deno.env.get("GOOGLE_CLIENT_ID");
  const redirectUri = Deno.env.get("GOOGLE_REDIRECT_URI");

  console.log("CLIENT ID existe:", !!clientId);
  console.log("REDIRECT URI:", redirectUri);

  if (!clientId || !redirectUri) {
    ctx.response.status = 500;
    ctx.response.body = {
      message: "Faltan las variables de configuración de Google"
    };
    return;
  }

  const url = new URL(
    "https://accounts.google.com/o/oauth2/v2/auth"
  );

  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "openid email profile");
  url.searchParams.set("access_type", "offline");

  ctx.response.redirect(url.toString());
}


// Recibir respuesta de Google
export async function callbackGoogle(ctx: Context) {
  try {
    const code = ctx.request.url.searchParams.get("code");

    if (!code) {
      ctx.response.status = 400;
      ctx.response.body = {
        message: "No se recibió el código de Google"
      };
      return;
    }

    const clientId = Deno.env.get("GOOGLE_CLIENT_ID");
    const clientSecret = Deno.env.get("GOOGLE_CLIENT_SECRET");
    const redirectUri = Deno.env.get("GOOGLE_REDIRECT_URI");

    if (!clientId || !clientSecret || !redirectUri) {
      ctx.response.status = 500;
      ctx.response.body = {
        message: "Faltan las variables de configuración de Google"
      };
      return;
    }

    // Intercambiar el código de Google por un access token
    const tokenResponse = await fetch(
      "https://oauth2.googleapis.com/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: "authorization_code"
        })
      }
    );

    const tokenData = await tokenResponse.json();

    console.log(
      "Token de Google recibido correctamente:",
      tokenResponse.ok
    );

    if (!tokenResponse.ok) {
      console.error(
        "Error obteniendo token de Google:",
        tokenData
      );

      ctx.response.status = 400;
      ctx.response.body = {
        message: "No se pudo obtener el token de Google"
      };
      return;
    }

    // Obtener información del usuario de Google
    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`
        }
      }
    );

    const datosGoogle = await userResponse.json();

    console.log(
      "Información del usuario de Google recibida:",
      userResponse.ok
    );

    if (!userResponse.ok) {
      console.error(
        "Error obteniendo usuario de Google:",
        datosGoogle
      );

      ctx.response.status = 400;
      ctx.response.body = {
        message: "No se pudieron obtener los datos de Google"
      };
      return;
    }

    const email = datosGoogle.email;
    const nombres = datosGoogle.given_name || "";
    const apellidos = datosGoogle.family_name || "";

    // Buscar usuario en PixelPyme
    let usuario = await buscarUsuarioPorEmail(email);

    console.log(
      "Usuario encontrado en la base de datos:",
      usuario.length > 0
    );

    // Si el usuario no existe, registrarlo
    if (usuario.length === 0) {
      await registrarUsuarioGoogle(
        nombres,
        apellidos,
        email
      );

      // Volver a buscar el usuario después de registrarlo
      usuario = await buscarUsuarioPorEmail(email);
    }

    if (usuario.length === 0) {
      ctx.response.status = 500;
      ctx.response.body = {
        message: "No se pudo crear o encontrar el usuario"
      };
      return;
    }

    const datosUsuario = usuario[0];
    console.log("===== USUARIO GOOGLE =====");
console.log("ID:", datosUsuario.id_usuario);
console.log("EMAIL:", datosUsuario.email);
console.log("ROL:", datosUsuario.rol);
console.log("==========================");

    // Crear JWT de PixelPyme
    const token = await generarToken(
      datosUsuario.id_usuario,
      datosUsuario.email,
      datosUsuario.rol
    );

    console.log("JWT PIXELPYME CREADO");
    console.log("REDIRIGIENDO AL FRONTEND...");

    if (datosUsuario.rol === "Administrador") {
  ctx.response.redirect(
    `http://localhost:4321/Administrador?token=${encodeURIComponent(token)}`
  );
} else {
  ctx.response.redirect(
    `http://localhost:4321/usuario?token=${encodeURIComponent(token)}`
  );
}

  } catch (error) {
    console.error("Error en Google Login:", error);

    ctx.response.status = 500;
    ctx.response.body = {
      message: "Error interno al iniciar sesión con Google"
    };
  }
}
