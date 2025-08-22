import { api } from "encore.dev/api";
import { intercessionDB } from "./db";

export interface UserPrayerHistoryRequest {
  userId: string;
}

export interface PrayerHistoryItem {
  id: string;
  cardSummary: string;
  category?: string;
  completedAt: Date;
  durationSeconds: number;
}

export interface UserPrayerHistoryResponse {
  prayers: PrayerHistoryItem[];
  totalPrayers: number;
  totalMinutes: number;
}

// Gets prayer history for a user
export const userHistory = api<UserPrayerHistoryRequest, UserPrayerHistoryResponse>(
  { expose: true, method: "GET", path: "/intercession/history/:userId" },
  async (req) => {
    const prayers = await intercessionDB.queryAll<any>`
      SELECT 
        ps.id,
        ic.summary as "cardSummary",
        ic.category,
        ps.completed_at as "completedAt",
        ps.duration_seconds as "durationSeconds"
      FROM prayer_sessions ps
      JOIN intercession_cards ic ON ps.card_id = ic.id
      WHERE ps.user_id = ${req.userId} AND ps.completed_at IS NOT NULL
      ORDER BY ps.completed_at DESC
      LIMIT 100
    `;

    const totalMinutes = prayers.reduce((sum, p) => sum + (p.durationSeconds / 60), 0);

    return {
      prayers: prayers.map(p => ({
        id: p.id,
        cardSummary: p.cardSummary,
        category: p.category,
        completedAt: p.completedAt,
        durationSeconds: p.durationSeconds,
      })),
      totalPrayers: prayers.length,
      totalMinutes: Math.round(totalMinutes),
    };
  }
);
