import express, { NextFunction, Request, Response } from "express";
import { userService } from "../services/userService";
import { purchaseService } from "../services/purchaseService";
import { ErrorPasswordNotMatch } from "../errors/ErrorPasswordNotMatch";
import { validationHandler } from "../middlewares/validationHandler";
import { createUserSchema, getUserSchema, updatePasswordSchema } from "../schemas/userSchema";
import { getPurchaseSchema } from "../schemas/purchaseSchema";

const router = express.Router();
const service = userService.getInstance();
const purchasesService = purchaseService.getInstance();

router.get("/:id", validationHandler(getUserSchema, "params"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      let user = await service.findById(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  });

router.get("/:userId/purchases", validationHandler(getUserSchema, "params"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      let user = await service.findById(userId);
      res.status(200).send(user.purchases);
    } catch (error) {
      next(error);
    }
  });

router.get("/:userId/purchases/:purchaseId",
  validationHandler(getUserSchema, "params"),
  validationHandler(getPurchaseSchema, "params"),
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, purchaseId } = req.params;
    try {
      let user = await service.findById(userId);
      let purchase = await purchasesService.findById(user.purchases, purchaseId);
      res.status(200).send(purchase);
    } catch (error) {
      next(error);
    }
  });

router.post("/", validationHandler(createUserSchema, "body"), async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { username, password } = req.body;
    await service.create(username, password);
    res.status(201).json({
      message: "User created successfully!"
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:userId",
  validationHandler(getUserSchema, "params"),
  validationHandler(updatePasswordSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const { newPassword, oldPassword } = req.body;
      const user = await service.findById(userId);
      await service.changePassword(user.id, oldPassword, newPassword);
      res.status(201).json({ message: "Password changed." });
    } catch (error) {
      next(error);
    }
  });

export default router;
