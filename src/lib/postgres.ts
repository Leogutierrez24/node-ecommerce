// import { Client } from "pg";
import { Pool } from "pg";
import { dbConfig } from "../config/dbConfig";

// export async function getConnection() {
//   const client = new Client({
//     host: "localhost",
//     port: 5432,
//     user: "postgres",
//     password: "binchuk24",
//     database: "honya"
//   });
//   await client.connect();
//   return client;
// }

const URL = `postgres://${dbConfig.DB_USER}:${dbConfig.DB_PASSWORD}@${dbConfig.DB_HOST}:${dbConfig.DB_PORT}/${dbConfig.DB_NAME}`

export const pool = new Pool({ connectionString: URL });
