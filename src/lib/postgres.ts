import { Pool } from "pg";
import { dbConfig } from "../config/dbConfig";

const URL = `postgres://${dbConfig.DB_USER}:${dbConfig.DB_PASSWORD}@${dbConfig.DB_HOST}:${dbConfig.DB_PORT}/${dbConfig.DB_NAME}`

export const pool = new Pool({ connectionString: URL });
