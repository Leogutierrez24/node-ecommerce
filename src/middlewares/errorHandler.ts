import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors/NotFoundError";
import { DatabaseError } from "../errors/DatabaseError";
import { PasswordError } from "../errors/PasswordError";
import { UnauthoriezError } from "../errors/UnauthorizedError";

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  console.error(`[ERROR] ${error.name}: ${error.message}`);

  if (error instanceof NotFoundError) {
    return res.status(404).json({ error: error.message });
  }

  if (error instanceof PasswordError) {
    return res.status(401).json({ error: error.message });
  }

  if (error instanceof DatabaseError) {
    return res.status(500).json({ error: "Internal database error." });
  }

  if (error instanceof UnauthoriezError) {
    return res.status(500).json({ error: "User not authorized!!!" });
  }

  return res.status(500).json({ error: "Something went wrong." });
}
