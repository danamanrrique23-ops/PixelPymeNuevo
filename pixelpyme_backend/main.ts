import { Application } from "@oak/oak";
import {iniciseccionRouter }from  "./routes/inicioseccionRouter.ts";
import { registroRouter } from "./routes/registroRouter.ts";
import { adminRouter } from "./routes/adminRouter.ts";
import { oakCors } from "./Dependencies/dependencias.ts"
import recuperacionPasswordRouter from "./routes/recuperacionPasswordRouter.ts";
import solicitudRouter from "./routes/solicitudRouter.ts";
import productoRouter from "./routes/productoRouter.ts";
const app = new Application();

app.use(oakCors({
  origin: "http://localhost:4321",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
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

app.use(recuperacionPasswordRouter.routes());
app.use(recuperacionPasswordRouter.allowedMethods());

app.use(solicitudRouter.routes());
app.use(solicitudRouter.allowedMethods());


app.use(productoRouter.routes());
app.use(productoRouter.allowedMethods());
app.use(adminRouter.routes());
app.use(adminRouter.allowedMethods());

const PORT = 8001;
console.log(`Servidor corriendo por el puerto 8001`);
await app.listen({ port: PORT });