import express, { Request, Response } from "express";
import { routerApi } from "./routes/index";
import { errorHandler, logErrors } from "./middlewares/errorHandler";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist: string[] = ["http://localhost:8080"];
const options: CorsOptions = {
  origin: whitelist
};
app.use(cors(options));
app.use(helmet());

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
  console.log("Server running on port: " + port);
});

