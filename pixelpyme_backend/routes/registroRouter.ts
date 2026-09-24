import { Router } from "@oak/oak";
import { postRegistro  } from "../controllers/registroController.ts";

const router = new Router();

router.post("/registro", postRegistro);

export {router as registroRouter };