import express, { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService";
import { PurchaseService } from "../services/PurchaseService";
import { validationHandler } from "../middlewares/validationHandler";
import { createUserSchema, getUserSchema, updatePasswordSchema } from "../schemas/userSchema";

const router = express.Router();
const service = UserService.getInstance();

router.get("/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await service.toList();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/:id",
  validationHandler(getUserSchema, "params"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      let user = await service.findById(Number.parseInt(id));
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/",
  validationHandler(createUserSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { email, password } = req.body;
      await service.create(email, password);
      res.status(201).json({
        message: "New user created!"
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch("/:id",
  validationHandler(getUserSchema, "params"),
  validationHandler(updatePasswordSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { newPassword, actualPassword } = req.body;
      const user = await service.findById(Number.parseInt(id));
      await service.changePassword(user.id as number, actualPassword, newPassword);
      res.status(201).json({ message: "Password changed." });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
