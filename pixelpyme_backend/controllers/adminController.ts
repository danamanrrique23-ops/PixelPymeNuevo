import { actualizarCliente,crearCliente, eliminarCliente, contarClientes, listarClientes } from "../models/userModel.ts";
import { hashPassword } from "../utils/hash.ts";

// deno-lint-ignore no-explicit-any
export const getTotalClientes = async (ctx: any) => {
  try {
    const total = await contarClientes();
    ctx.response.status = 200;
    ctx.response.body = { total };
  } catch (error) {
    console.error("Error al contar clientes:", error);
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al obtener el total de clientes" };
  }
};

// deno-lint-ignore no-explicit-any
export const getClientes = async (ctx: any) => {
  try {
    // Lista de clientes (sin contraseña)
    const clientes = await listarClientes();
    ctx.response.status = 200;
    ctx.response.body = clientes;
  } catch (error) {
    console.error("Error al listar clientes:", error);
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al obtener los clientes" };
  }
};

export const postCliente = async (ctx: any) => {
  try {
    // Si tu registroController lee el body de otra forma, copia esa misma
    const { nombres, apellidos, email, password } = await ctx.request.body.json();

    if (!nombres || !apellidos || !email || !password) {
      ctx.response.status = 400;
      ctx.response.body = { mensaje: "Todos los campos son obligatorios" };
      return;
    }

    // Nunca se guarda la clave en texto plano
    const passwordHash = await hashPassword(password);
    await crearCliente(nombres.trim(), apellidos.trim(), email.trim(), passwordHash);

    ctx.response.status = 201;
    ctx.response.body = { mensaje: "Cliente creado" };
  } catch (error) {
    console.error("Error al crear cliente:", error);
    // El correo es único: si ya existe, MySQL avisa con "Duplicate entry"
    if (String(error).includes("Duplicate")) {
      ctx.response.status = 409;
      ctx.response.body = { mensaje: "Ya existe un usuario con ese correo" };
      return;
    }
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al crear el cliente" };
  }
};

// deno-lint-ignore no-explicit-any
export const putCliente = async (ctx: any) => {
  try {
    const id = Number(ctx.params.id);
    const { nombres, apellidos, email, password } = await ctx.request.body.json();

    if (!nombres || !apellidos || !email) {
      ctx.response.status = 400;
      ctx.response.body = { mensaje: "Nombres, apellidos y correo son obligatorios" };
      return;
    }

    // La contraseña es opcional al editar
    const passwordHash = password ? await hashPassword(password) : undefined;
    await actualizarCliente(id, nombres.trim(), apellidos.trim(), email.trim(), passwordHash);

    ctx.response.status = 200;
    ctx.response.body = { mensaje: "Cliente actualizado" };
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    if (String(error).includes("Duplicate")) {
      ctx.response.status = 409;
      ctx.response.body = { mensaje: "Ya existe un usuario con ese correo" };
      return;
    }
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al actualizar el cliente" };
  }
};

// deno-lint-ignore no-explicit-any
export const deleteCliente = async (ctx: any) => {
  try {
    const id = Number(ctx.params.id);
    await eliminarCliente(id);
    ctx.response.status = 200;
    ctx.response.body = { mensaje: "Cliente eliminado" };
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    ctx.response.status = 500;
    ctx.response.body = { mensaje: "Error al eliminar el cliente" };
  }
};

