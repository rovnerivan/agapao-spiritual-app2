import { SQLDatabase } from "encore.dev/storage/sqldb";

export const confessionDB = new SQLDatabase("confession", {
  migrations: "./migrations",
});
