import { Router } from "@oak/oak";
import { solicitarRecuperacion } from "../controllers/recuperacionPasswordController.ts";

const router = new Router();

router.post("/api/recuperar", solicitarRecuperacion);

export default router;