import { SQLDatabase } from "encore.dev/storage/sqldb";

export const intercessionDB = new SQLDatabase("intercession", {
  migrations: "./migrations",
});
