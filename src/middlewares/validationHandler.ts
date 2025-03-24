import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export function validationHandler(schema: Schema, property: keyof Request) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: true });
    if (error) {
      res.status(400).json({
        message: "Validation failed",
        errors: error.details.map((detail) => ({
          field: detail.path.join("."),
          message: detail.message,
          value: req.body.products
        }))
      });
    } else {
      next();
    }
  }
}
