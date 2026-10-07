import { Router } from "@oak/oak";

import {
  registrarSolicitud,
  obtenerSolicitudesUsuario
} from "../controllers/solicitudController.ts";


const solicitudRouter =
  new Router();


/*
  CREAR SOLICITUD

  POST /api/solicitudes
*/

solicitudRouter.post(
  "/api/solicitudes",
  registrarSolicitud
);


/*
  CONSULTAR SOLICITUDES

  GET /api/solicitudes/usuario/:id
*/

solicitudRouter.get(
  "/api/solicitudes/usuario/:id",
  obtenerSolicitudesUsuario
);


export default solicitudRouter;