import { api } from "encore.dev/api";
import { intercessionDB } from "./db";

export interface IntercessionCard {
  id: string;
  summary: string;
  category?: string;
  prayerCount: number;
  createdAt: Date;
  timeAgo: string;
}

export interface ListCardsResponse {
  cards: IntercessionCard[];
}

// Lists approved intercession cards for prayer
export const listCards = api<void, ListCardsResponse>(
  { expose: true, method: "GET", path: "/intercession/cards" },
  async () => {
    const cards = await intercessionDB.queryAll<any>`
      SELECT 
        id,
        summary,
        category,
        prayer_count as "prayerCount",
        created_at as "createdAt"
      FROM intercession_cards
      WHERE moderation_status = 'approved'
      ORDER BY created_at DESC
      LIMIT 50
    `;

    return {
      cards: cards.map(card => ({
        id: card.id,
        summary: card.summary,
        category: card.category,
        prayerCount: card.prayerCount,
        createdAt: card.createdAt,
        timeAgo: getTimeAgo(card.createdAt),
      }))
    };
  }
);

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `${diffDays} día${diffDays > 1 ? 's' : ''} atrás`;
  } else if (diffHours > 0) {
    return `${diffHours} hora${diffHours > 1 ? 's' : ''} atrás`;
  } else {
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    return `${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''} atrás`;
  }
}
