import express, { Request, Response } from "express";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const size = parseInt(req.query.size as string);
  const limit = size || 10;
  let products = [];
  if (typeof limit === "number"){
    for(let i = 0; i < limit; i++)
      {
        products.push({
          name: "Product " + i,
          price: 1500,
        });
      }
      res.json(products);
  } else
  {
    res.send("Not a valid query!!!");
  }
});

router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({
    id,
    name: "Keyboard",
    price: 2400
  });
});

router.post("/", (req: Request, res: Response) => {
  const body = req.body;
  res.json({
    message: "created",
    data: body,
  })
});

export default router;
