import { Client } from "pg";

export async function getConnection() {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "binchuk24",
    database: "pasokon_store"
  });
  await client.connect();
  return client;
}
