import express, { NextFunction, Request, Response } from "express";
import { CategoryService } from "../services/CategoryService";
import { ICategory } from "../models/ICategory";
import { createUpdateCategorySchema, getCategorySchema } from "../schemas/categorySchema";
import { validationHandler } from "../middlewares/validationHandler";

const router = express.Router();
const service = CategoryService.getInstance();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    let categories: ICategory[] = await service.toList();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});

router.post("/", validationHandler(createUpdateCategorySchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body;
      let newCategory = await service.create(name);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  });

router.patch("/:id",
  validationHandler(getCategorySchema, "params"),
  validationHandler(createUpdateCategorySchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      await service.update(Number.parseInt(id), name);
      res.status(201).json({ message: `Category with ID: ${id} was updated.` });
    } catch (error) {
      next(error);
    }
  });

router.delete("/:id", validationHandler(getCategorySchema, "params"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await service.delete(Number.parseInt(id));
      res.status(201).send(`Category with ID: ${id} was deleted.`);
    } catch (error) {
      next(error);
    }
  });

export default router;
