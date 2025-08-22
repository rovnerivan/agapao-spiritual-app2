import { SQLDatabase } from "encore.dev/storage/sqldb";

export const adminDB = SQLDatabase.named("confession");
export const intercessionAdminDB = SQLDatabase.named("intercession");
