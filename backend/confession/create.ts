import { api } from "encore.dev/api";
import { confessionDB } from "./db";

export type ConfessionCategory = 
  | "anger" 
  | "lust" 
  | "lies" 
  | "pride" 
  | "envy" 
  | "addictions" 
  | "relationships" 
  | "other";

export interface CreateConfessionRequest {
  userId: string;
  content: string;
  category?: ConfessionCategory;
  allowIntercession: boolean;
}

export interface Confession {
  id: string;
  userId: string;
  content: string;
  category?: ConfessionCategory;
  allowIntercession: boolean;
  status: "submitted" | "processing" | "completed";
  createdAt: Date;
}

// Creates a new confession
export const create = api<CreateConfessionRequest, Confession>(
  { expose: true, method: "POST", path: "/confession" },
  async (req) => {
    if (req.content.length > 2000) {
      throw new Error("Confession content exceeds maximum length of 2000 characters");
    }

    const confession = await confessionDB.queryRow<Confession>`
      INSERT INTO confessions (user_id, content, category, allow_intercession)
      VALUES (${req.userId}, ${req.content}, ${req.category || null}, ${req.allowIntercession})
      RETURNING 
        id,
        user_id as "userId",
        content,
        category,
        allow_intercession as "allowIntercession",
        status,
        created_at as "createdAt"
    `;

    return confession!;
  }
);
