import express, { Request, Response } from "express";
import { routerApi } from "./routes/index";
import { errorHandler, logErrors } from "./middlewares/errorHandler";
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

app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Mi puerto: " + port);
});

