import express, { Request, Response } from "express";
import { ProductService } from "../services/productService";
import { IProduct } from "../models/IProduct";

const router = express.Router();
const productService = new ProductService();

router.get("/", (req: Request, res: Response) => {
    const products = productService.toList();
    res.json(products);
  });

router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const product = productService.findById(parseInt(id));
  res.json(product);
});

router.post("/", (req: Request, res: Response) => {
  const body = req.body;
  res.status(201).json({
    message: "created",
    data: body,
  });
});

router.patch("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: "updated",
    data: body,
    id,
  });
});

router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    message: "deleted",
    id,
  });
});

export default router;
