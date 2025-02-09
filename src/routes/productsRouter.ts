import express, { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/ProductService";
import { ICategory } from "../models/ICategory";
import { IProduct } from "../models/IProduct";
import { validationHandler } from "../middlewares/validationHandler";
import { createProductSchema, getProductSchema, updateProductSchema } from "../schemas/productSchema";

const router = express.Router();
const service = ProductService.getInstance();

router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await service.toList();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({
      message: "Failed to fetch products from database."
    });
  }
});

router.get("/:id", validationHandler(getProductSchema, "params"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await service.findById(parseInt(id));
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  });

router.get("/categories/:categoryId", async (req: Request, res: Response, next: NextFunction) => {
  /*try {
    const { id } = req.params;
    const products = await service.listByCategory(id);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }*/
});

router.post("/", validationHandler(createProductSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, price, categories } = req.body;
      const newProduct = await service.create(name, parseInt(price), categories as ICategory[]);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  });

router.patch("/:id",
  validationHandler(getProductSchema, "params"),
  validationHandler(updateProductSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const body = req.body as Partial<IProduct>;
      await service.update(Number.parseInt(id), body);
      res.status(201).json({
        message: `Product with ID: ${id} was updated.`
      });
    } catch (error) {
      next(error);
    }
  });

router.delete("/:id", validationHandler(getProductSchema, "params"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await service.delete(Number.parseInt(id));
      res.status(201).json({
        message: `Product with ID: ${id} was deleted.`,
        id,
      });
    } catch (error) {
      next(error);
    }
  });

export default router;
