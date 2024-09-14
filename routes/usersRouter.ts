import express, { Request, Response } from "express";
const router = express.Router();

router.get("/users", (req: Request, res: Response) => {
  const { limit, off } = req.query;
  if (limit && off) {
    res.json(
      {
        limit,
        off
      }
    );
  }
  else {
    res.send("No hay parámetros.");
  }
});

router.get("users/:userId/purchases", (req: Request, res: Response) => {

});

router.get("users/:userId/purchases/:purchaseId", (req: Request, res: Response) => {

});

export default router;
