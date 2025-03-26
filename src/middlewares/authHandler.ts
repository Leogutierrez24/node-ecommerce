import { Request, Response, NextFunction } from "express";
import { UnauthoriezError } from "../errors/UnauthorizedError";
import { dbConfig } from "../config/dbConfig";

export function checkApiKey(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers["api"];

  if (apiKey === dbConfig.API_KEY) {
    next();
  } else {
    throw new UnauthoriezError("user unauthorized!");
  }
}
