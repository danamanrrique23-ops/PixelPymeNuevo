import db from "../utils/db.ts";

export async function obtenerProductos() {
  const resultado = await db.query(`
    SELECT
      p.id_producto,
      p.nombre,
      p.descripcion,
      p.marca,
      p.caracteristicas,
      p.imagen,
      p.cantidad,
      p.estado,
      p.id_categoria,
      c.nombre AS nombre_categoria
    FROM productos p
    INNER JOIN categorias c
      ON p.id_categoria = c.id_categoria
    ORDER BY p.id_producto ASC
  `);

  return resultado;
}

export async function obtenerProductoPorId(id_producto: number) {
  const resultado = await db.query(
    `
    SELECT
      p.id_producto,
      p.nombre,
      p.descripcion,
      p.marca,
      p.caracteristicas,
      p.imagen,
      p.cantidad,
      p.estado,
      p.id_categoria,
      c.nombre AS nombre_categoria
    FROM productos p
    INNER JOIN categorias c
      ON p.id_categoria = c.id_categoria
    WHERE p.id_producto = ?
    `,
    [id_producto]
  );

  return resultado;
}