import { api, APIError } from "encore.dev/api";
import { confessionDB } from "./db";

export interface GetConfessionRequest {
  id: string;
}

export interface ConfessionWithResponse {
  id: string;
  userId: string;
  content: string;
  category?: string;
  allowIntercession: boolean;
  status: "submitted" | "processing" | "completed";
  createdAt: Date;
  response?: {
    id: string;
    empathyText: string;
    bibleVerse: string;
    bibleReference: string;
    reflectionText: string;
    prayerGuide: string;
    encouragementText: string;
    createdAt: Date;
  };
}

// Retrieves a confession with its AI response
export const get = api<GetConfessionRequest, ConfessionWithResponse>(
  { expose: true, method: "GET", path: "/confession/:id" },
  async (req) => {
    const confession = await confessionDB.queryRow<any>`
      SELECT 
        c.id,
        c.user_id as "userId",
        c.content,
        c.category,
        c.allow_intercession as "allowIntercession",
        c.status,
        c.created_at as "createdAt",
        r.id as "responseId",
        r.empathy_text as "empathyText",
        r.bible_verse as "bibleVerse",
        r.bible_reference as "bibleReference",
        r.reflection_text as "reflectionText",
        r.prayer_guide as "prayerGuide",
        r.encouragement_text as "encouragementText",
        r.created_at as "responseCreatedAt"
      FROM confessions c
      LEFT JOIN ai_responses r ON c.id = r.confession_id
      WHERE c.id = ${req.id}
    `;

    if (!confession) {
      throw APIError.notFound("Confession not found");
    }

    const result: ConfessionWithResponse = {
      id: confession.id,
      userId: confession.userId,
      content: confession.content,
      category: confession.category,
      allowIntercession: confession.allowIntercession,
      status: confession.status,
      createdAt: confession.createdAt,
    };

    if (confession.responseId) {
      result.response = {
        id: confession.responseId,
        empathyText: confession.empathyText,
        bibleVerse: confession.bibleVerse,
        bibleReference: confession.bibleReference,
        reflectionText: confession.reflectionText,
        prayerGuide: confession.prayerGuide,
        encouragementText: confession.encouragementText,
        createdAt: confession.responseCreatedAt,
      };
    }

    return result;
  }
);
