import { api } from "encore.dev/api";
import { confessionDB } from "./db";

export interface ListUserConfessionsRequest {
  userId: string;
}

export interface UserConfession {
  id: string;
  content: string;
  category?: string;
  status: "submitted" | "processing" | "completed";
  createdAt: Date;
  hasResponse: boolean;
}

export interface ListUserConfessionsResponse {
  confessions: UserConfession[];
}

// Lists all confessions for a specific user
export const listUser = api<ListUserConfessionsRequest, ListUserConfessionsResponse>(
  { expose: true, method: "GET", path: "/confession/user/:userId" },
  async (req) => {
    const confessions = await confessionDB.queryAll<any>`
      SELECT 
        c.id,
        c.content,
        c.category,
        c.status,
        c.created_at as "createdAt",
        CASE WHEN r.id IS NOT NULL THEN true ELSE false END as "hasResponse"
      FROM confessions c
      LEFT JOIN ai_responses r ON c.id = r.confession_id
      WHERE c.user_id = ${req.userId}
      ORDER BY c.created_at DESC
    `;

    return {
      confessions: confessions.map(c => ({
        id: c.id,
        content: c.content,
        category: c.category,
        status: c.status,
        createdAt: c.createdAt,
        hasResponse: c.hasResponse,
      }))
    };
  }
);
