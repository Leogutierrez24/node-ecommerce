import { ProcessEnv } from "../types/env";
import * as dotenv from "dotenv";

dotenv.config();

export const dbConfig: ProcessEnv = {
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.PORT || "3000",
}
