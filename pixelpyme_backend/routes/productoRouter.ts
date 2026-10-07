import { Router } from "@oak/oak";

import {
  listarProductos,
  buscarProductoPorId
} from "../controllers/productoController.ts";

const productoRouter = new Router();

productoRouter.get("/api/productos", listarProductos);

productoRouter.get(
  "/api/productos/:id",
  buscarProductoPorId
);

export default productoRouter;