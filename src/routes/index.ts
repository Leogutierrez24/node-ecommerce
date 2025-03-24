import express, { Express } from "express";
import productRouter from "./productRouter";
import usersRouter from "./usersRouter";
import categoryRouter from "./categoryRouter";
import purchaseRouter from "./purchaseRouter";

export function routerApi(app: Express)
{
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/products", productRouter);
  router.use("/categories", categoryRouter);
  router.use("/user", usersRouter);
  router.use("/purchases", purchaseRouter)
};
