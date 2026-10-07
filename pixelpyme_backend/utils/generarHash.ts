import { hash } from "bcrypt";

const passwordAdmin = "pato12345"; 

const hashGenerado = await hash(passwordAdmin);

console.log("Hash generado:", hashGenerado);