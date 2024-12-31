import express, { Request, Response } from "express";
import { userService } from "../services/userService";
import { purchaseService } from "../services/purchaseService";
import { ErrorUserNotFound } from "../errors/ErrorUserNotFound";
import { ErrorPurchaseNotFound } from "../errors/ErrorPurchaseNotFound";

const router = express.Router();
const service = userService.getInstance();
const purchasesService = purchaseService.getInstance();

router.get("/:id", async (req: Request, res: Response) => {
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

router.get("/:userId/purchases", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    let user = await service.findById(id);
    res.status(200).send(user.purchases);
  } catch (err) {
    res.status(404).json({
      message: `User not founded with the id: ${id}.`
    });
  }
});

router.get("/:userId/purchases/:purchaseId", (req: Request, res: Response) => {
  router.get("/:userId/purchases", async (req: Request, res: Response) => {
    const { userId, purchaseId } = req.params;
    try {
      let user = await service.findById(userId);
      let purchase = await purchasesService.findById(user.purchases, purchaseId);
      res.status(200).send(user.purchases);
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
});

router.post("/", (req: Request, res: Response) => {

});

router.patch("/:id", (req: Request, res: Response) => {

});

router.delete("/:id", (req: Request, res: Response) => {

});

export default router;
