import express, { Request, Response } from "express";
import { userService } from "../services/userService";
import { purchaseService } from "../services/purchaseService";
import { ErrorUserNotFound } from "../errors/ErrorUserNotFound";
import { ErrorPurchaseNotFound } from "../errors/ErrorPurchaseNotFound";
import { ErrorPasswordNotMatch } from "../errors/ErrorPasswordNotMatch";
import { validationHandler } from "../middlewares/validationHandler";
import { createUserSchema, getUserSchema, updatePasswordSchema } from "../schemas/userSchema";
import { getPurchaseSchema } from "../schemas/purchaseSchema";

const router = express.Router();
const service = userService.getInstance();
const purchasesService = purchaseService.getInstance();

router.get("/:id", validationHandler(getUserSchema, "params"), async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    let user = await service.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({
      messaje: `User not founded with the id: ${id}.`
    });
  }
});

router.get("/:userId/purchases", validationHandler(getUserSchema, "params"), async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    let user = await service.findById(userId);
    res.status(200).send(user.purchases);
  } catch (err) {
    res.status(404).json({
      message: `User not founded with the id: ${userId}.`
    });
  }
});

router.get("/:userId/purchases/:purchaseId",
  validationHandler(getUserSchema, "params"),
  validationHandler(getPurchaseSchema, "params"),
  async (req: Request, res: Response) => {
    const { userId, purchaseId } = req.params;
    try {
      let user = await service.findById(userId);
      let purchase = await purchasesService.findById(user.purchases, purchaseId);
      res.status(200).send(purchase);
    } catch (err) {
      if (err instanceof ErrorUserNotFound) {
        res.status(404).json({
          message: `User not founded with id: ${userId}.`
        });
      } else if (err instanceof ErrorPurchaseNotFound) {
        res.status(404).json({
          message: `Purchase not founded with id: ${purchaseId}.`
        });
      } else {
        res.status(404).json({
          message: "An error occured."
        });
      }
    }
  });

router.post("/", validationHandler(createUserSchema, "body"), async (req: Request, res: Response) => {
  let { username, password } = req.body;
  try {
    await service.create(username, password);
    res.status(201).json({
      message: "User created."
    });
  } catch (error) {
    res.status(400).json({
      message: "An error ocurred. User not created."
    })
  }

});

router.patch("/:userId",
  validationHandler(getUserSchema, "params"),
  validationHandler(updatePasswordSchema, "body"),
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { newPassword, oldPassword } = req.body;
    try {
      const user = await service.findById(userId);
      await service.changePassword(user.id, oldPassword, newPassword);
      res.status(201).json({ message: "Password changed." });
    } catch (error) {
      if (error instanceof ErrorPasswordNotMatch) res.status(400).json({ message: error.message })
      else if (error instanceof ErrorUserNotFound) res.status(400).json({ message: error.message })
      else res.status(400).json({ message: "Something went wrong." });
    }
  });

export default router;
