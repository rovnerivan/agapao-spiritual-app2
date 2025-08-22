import { api, APIError } from "encore.dev/api";
import { intercessionDB } from "./db";

export interface StartPrayerRequest {
  cardId: string;
  userId: string;
}

export interface PrayerSession {
  id: string;
  cardId: string;
  userId: string;
  startedAt: Date;
}

// Starts a prayer session for an intercession card
export const startPrayer = api<StartPrayerRequest, PrayerSession>(
  { expose: true, method: "POST", path: "/intercession/pray" },
  async (req) => {
    const card = await intercessionDB.queryRow<any>`
      SELECT id FROM intercession_cards 
      WHERE id = ${req.cardId} AND moderation_status = 'approved'
    `;

    if (!card) {
      throw APIError.notFound("Intercession card not found or not approved");
    }

    const session = await intercessionDB.queryRow<PrayerSession>`
      INSERT INTO prayer_sessions (card_id, user_id)
      VALUES (${req.cardId}, ${req.userId})
      RETURNING 
        id,
        card_id as "cardId",
        user_id as "userId",
        started_at as "startedAt"
    `;

    return session!;
  }
);
