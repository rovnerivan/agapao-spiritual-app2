import { api, APIError } from "encore.dev/api";
import { intercessionDB } from "./db";

export interface CompletePrayerRequest {
  sessionId: string;
  durationSeconds: number;
}

export interface CompletePrayerResponse {
  success: boolean;
  newPrayerCount: number;
}

// Completes a prayer session and updates the prayer count
export const completePrayer = api<CompletePrayerRequest, CompletePrayerResponse>(
  { expose: true, method: "POST", path: "/intercession/complete" },
  async (req) => {
    const session = await intercessionDB.queryRow<any>`
      SELECT card_id FROM prayer_sessions 
      WHERE id = ${req.sessionId} AND completed_at IS NULL
    `;

    if (!session) {
      throw APIError.notFound("Prayer session not found or already completed");
    }

    await intercessionDB.exec`
      UPDATE prayer_sessions 
      SET completed_at = NOW(), duration_seconds = ${req.durationSeconds}
      WHERE id = ${req.sessionId}
    `;

    const updatedCard = await intercessionDB.queryRow<any>`
      UPDATE intercession_cards 
      SET prayer_count = prayer_count + 1
      WHERE id = ${session.card_id}
      RETURNING prayer_count as "prayerCount"
    `;

    return {
      success: true,
      newPrayerCount: updatedCard!.prayerCount,
    };
  }
);
