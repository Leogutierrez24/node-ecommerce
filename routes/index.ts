import express, { Express } from "express";

import productsRouter from "./productsRouter";
import usersRouter from "./usersRouter";
import categoriesRouter from "./categoriesRouter";

export function routerApi(app: Express)
{
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/products", productsRouter);
  router.use("/categories", categoriesRouter);
  router.use("/users", usersRouter);
}
