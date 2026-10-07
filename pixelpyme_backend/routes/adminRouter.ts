import { Router } from "../Dependencies/dependencias.ts"; // el mismo import de Router que ya tenías
import {
  deleteCliente,
  getClientes,
  getTotalClientes,
  postCliente,
  putCliente,
} from "../controllers/adminController.ts";

const adminRouter = new Router();

adminRouter.get("/clientes/total", getTotalClientes);
adminRouter.get("/clientes", getClientes);
adminRouter.post("/clientes", postCliente);
adminRouter.put("/clientes/:id", putCliente);
adminRouter.delete("/clientes/:id", deleteCliente);

export { adminRouter };