import { Application } from "@oak/oak";
import {iniciseccionRouter }from  "./routes/inicioseccionRouter.ts";
import { registroRouter } from "./routes/registroRouter.ts";
import { oakCors } from "./Dependencies/dependencias.ts"

const app = new Application();
app.use(oakCors());
// Middleware global de manejo de errores (va primero, envuelve todo lo demás)
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error("Error:", err);
    ctx.response.status = 500;
    ctx.response.body = { message: "Ocurrió un error en el servidor" };
  }
});

app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`);
  await next();
});

app.use(iniciseccionRouter .routes());
app.use(iniciseccionRouter .allowedMethods());

app.use(registroRouter .routes());
app.use( registroRouter.allowedMethods());

const PORT = 8001;
console.log(`Servidor corriendo por el puerto 8001`);
await app.listen({ port: PORT });