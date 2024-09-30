import { NextFunction, Request, Response } from "express";

export function logErrors(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  next(err);
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction)
{
  res.status(500).json(
    {
      message: err.message,
      stack: err.stack,
    }
  )
}
