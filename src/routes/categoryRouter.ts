import express, { Request, Response } from "express";
import { categoryService } from "../services/categoryService";
import { ICategory } from "../models/ICategory";
import { createUpdateCategorySchema, getCategorySchema } from "../schemas/categorySchema";
import { validationHandler } from "../middlewares/validationHandler";

const router = express.Router();
const service = categoryService.getInstance();

router.get("/", async (req: Request, res: Response) => {
  try {
    let categories: ICategory[] = await service.toList();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

router.post("/", validationHandler(createUpdateCategorySchema, "body"), async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    let newCategory = await service.create(name);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).send("Something went wrong.");
  }
});

router.patch("/:id",
  validationHandler(getCategorySchema, "params"),
  validationHandler(createUpdateCategorySchema, "body"), async (req: Request, res: Response) => {
  const { id, name } = req.body;
  try {
    let newCategory = await service.update(id, name);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).send("Something went wrong.");
  }
});

router.delete("/:id", validationHandler(getCategorySchema, "params"), async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    let deletedCategory = await service.delete(id);
    res.status(201).send(`Category: ${deletedCategory.name} was deleted succesfully.`);
  } catch (error) {
    res.status(400).send("Something went wrong.");
  }
});

export default router;
