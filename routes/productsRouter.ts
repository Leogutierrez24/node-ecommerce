import express, { Request, Response } from "express";
import { ProductService } from "../services/productService";
import { ICategory } from "../models/ICategory";
import { IProduct } from "../models/IProduct";

const router = express.Router();
const productService = ProductService.getInstance();

router.get("/", async (req: Request, res: Response) => {
  const products = await productService.toList();
  res.json(products);
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await productService.findById(parseInt(id));
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({
      message: "Product not found."
    });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { name, price, categories } = req.body;

  if (!name) res.status(400).send("Name is required.");
  else if (!price) res.status(400).send("Price is required.");
  else if (!categories) res.status(400).send("A category is required.");
  else {
    let newProduct = await productService.create(name, parseInt(price), categories as ICategory[]);
    res.status(201).json(newProduct);
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body as Partial<IProduct>;
    await productService.update(parseInt(id), body);
    res.status(201).json({
      message: `Product with ID: ${id} was updated.`
    });
  } catch (err) {
    res.status(400).send("An error occurred.");
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await productService.delete(parseInt(id));
    res.status(201).json({
      message: `Product with ID: ${id} was deleted.`,
      id,
    });
  } catch (err) {
    res.status(404).send("Product Not found");
  }
});

export default router;
