import { api } from "encore.dev/api";
import { adminDB, intercessionAdminDB } from "./db";

export interface AdminStats {
  totalConfessions: number;
  pendingConfessions: number;
  completedConfessions: number;
  activeCards: number;
  pendingCards: number;
  totalPrayers: number;
  todayConfessions: number;
  todayPrayers: number;
}

// Gets admin dashboard statistics
export const getStats = api<void, AdminStats>(
  { expose: true, method: "GET", path: "/admin/stats" },
  async () => {
    const confessionStats = await adminDB.queryRow<any>`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'submitted' THEN 1 END) as pending,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed,
        COUNT(CASE WHEN DATE(created_at) = CURRENT_DATE THEN 1 END) as today
      FROM confessions
    `;

    const cardStats = await intercessionAdminDB.queryRow<any>`
      SELECT 
        COUNT(CASE WHEN moderation_status = 'approved' THEN 1 END) as active,
        COUNT(CASE WHEN moderation_status = 'pending' THEN 1 END) as pending
      FROM intercession_cards
    `;

    const prayerStats = await intercessionAdminDB.queryRow<any>`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN DATE(completed_at) = CURRENT_DATE THEN 1 END) as today
      FROM prayer_sessions
      WHERE completed_at IS NOT NULL
    `;

    return {
      totalConfessions: parseInt(confessionStats!.total),
      pendingConfessions: parseInt(confessionStats!.pending),
      completedConfessions: parseInt(confessionStats!.completed),
      activeCards: parseInt(cardStats!.active || '0'),
      pendingCards: parseInt(cardStats!.pending || '0'),
      totalPrayers: parseInt(prayerStats!.total || '0'),
      todayConfessions: parseInt(confessionStats!.today),
      todayPrayers: parseInt(prayerStats!.today || '0'),
    };
  }
);
