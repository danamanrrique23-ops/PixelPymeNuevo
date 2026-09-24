import { Client } from "mysql";

const client = await new Client().connect({
  hostname: "localhost",
  username: "root",
  db: "pixelpyme",
  password: "", 
});

export default client;