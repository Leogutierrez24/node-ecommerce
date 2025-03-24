import { PurchaseService } from "../services/PurchaseService";
import { getPurchaseSchema } from "../schemas/purchaseSchema";
import { getUserSchema } from "../schemas/userSchema";
import { newPurchaseSchema } from "../schemas/purchaseSchema";
import express, { Request, Response, NextFunction } from "express";
import { validationHandler } from "../middlewares/validationHandler";
import { Cart } from "../services/Cart";
import { IPurchaseItem } from "../models/IPurchaseItem";

const router = express.Router();
const service = PurchaseService.getInstance();

router.get("/:id",
  validationHandler(getPurchaseSchema, "params"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const purchase = await service.findById(Number.parseInt(id));
      res.status(200).json(purchase);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:userId/purchases",
  validationHandler(getUserSchema, "params"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const purchases = await service.getUserPurchases(Number.parseInt(userId));
      res.status(200).json(purchases);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/",
  validationHandler(newPurchaseSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.body;
      const { products } = req.body;
      const cart = new Cart(products as IPurchaseItem[]);
      await service.create(cart, Number.parseInt(userId));
      res.status(200).json({
        message: "Purchase Created!"
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
