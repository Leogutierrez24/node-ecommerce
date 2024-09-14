import express, { Request, Response } from "express";
import { routerApi } from "./routes/index";
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hola, este es mi servidor en Express.");
});

app.get("/nueva-ruta", (req: Request, res: Response) => {
  res.send("Soy un nuevo Endpoint");
});

routerApi(app);

app.listen(port, () => {
  console.log("Mi puerto: " + port);
})

