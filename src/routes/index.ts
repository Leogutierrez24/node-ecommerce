import express, { Express } from "express";
import categoryRouter from "./categoryRouter";
import productsRouter from "./productsRouter";
import usersRouter from "./usersRouter";

export function routerApi(app: Express)
{
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/products", productsRouter);
  router.use("/categories", categoryRouter);
  router.use("/user", usersRouter);
};
