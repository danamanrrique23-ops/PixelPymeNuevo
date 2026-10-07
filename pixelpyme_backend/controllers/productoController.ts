import { Context } from "../Dependencies/dependencias.ts";
import {
  obtenerProductos,
  obtenerProductoPorId
} from "../models/productoModel.ts";

export async function listarProductos(ctx:Context) {
  try {
    const productos = await obtenerProductos();

    ctx.response.status = 200;
    ctx.response.body = productos;
  } catch (error) {
    console.error("Error al obtener productos:", error);

    ctx.response.status = 500;
    ctx.response.body = {
      mensaje: "Error al obtener los productos"
    };
  }
}

export async function buscarProductoPorId(ctx:Context) {
  try {
    const id = Number(ctx.state.id);

    if (!id) {
      ctx.response.status = 400;
      ctx.response.body = {
        mensaje: "ID de producto inválido"
      };
      return;
    }

    const productos = await obtenerProductoPorId(id);

    if (productos.length === 0) {
      ctx.response.status = 404;
      ctx.response.body = {
        mensaje: "Producto no encontrado"
      };
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = productos[0];
  } catch (error) {
    console.error("Error al obtener producto:", error);

    ctx.response.status = 500;
    ctx.response.body = {
      mensaje: "Error al obtener el producto"
    };
  }
}