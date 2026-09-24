import { Router } from "@oak/oak";

import { postLogin } from "../controllers/inicioseccionController.ts";

import {
  iniciarGoogle,
  callbackGoogle
} from "../controllers/googleController.ts";

const router = new Router();

router.post("/api/login", postLogin);

router.get("/api/auth/google", iniciarGoogle);

router.get("/api/auth/google/callback", callbackGoogle);

export { router as iniciseccionRouter };