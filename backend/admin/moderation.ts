import { api, APIError } from "encore.dev/api";
import { intercessionAdminDB } from "./db";

export interface PendingCard {
  id: string;
  confessionId: string;
  summary: string;
  category?: string;
  createdAt: Date;
}

export interface ListPendingCardsResponse {
  cards: PendingCard[];
}

export interface ModerateCardRequest {
  cardId: string;
  action: "approve" | "reject";
}

export interface ModerateCardResponse {
  success: boolean;
}

// Lists pending intercession cards for moderation
export const listPendingCards = api<void, ListPendingCardsResponse>(
  { expose: true, method: "GET", path: "/admin/moderation/pending" },
  async () => {
    const cards = await intercessionAdminDB.queryAll<any>`
      SELECT 
        id,
        confession_id as "confessionId",
        summary,
        category,
        created_at as "createdAt"
      FROM intercession_cards
      WHERE moderation_status = 'pending'
      ORDER BY created_at ASC
    `;

    return {
      cards: cards.map(card => ({
        id: card.id,
        confessionId: card.confessionId,
        summary: card.summary,
        category: card.category,
        createdAt: card.createdAt,
      }))
    };
  }
);

// Moderates an intercession card (approve or reject)
export const moderateCard = api<ModerateCardRequest, ModerateCardResponse>(
  { expose: true, method: "POST", path: "/admin/moderation/moderate" },
  async (req) => {
    const card = await intercessionAdminDB.queryRow<any>`
      SELECT id FROM intercession_cards 
      WHERE id = ${req.cardId} AND moderation_status = 'pending'
    `;

    if (!card) {
      throw APIError.notFound("Card not found or already moderated");
    }

    const newStatus = req.action === "approve" ? "approved" : "rejected";
    const approvedAt = req.action === "approve" ? "NOW()" : "NULL";

    await intercessionAdminDB.exec`
      UPDATE intercession_cards 
      SET moderation_status = ${newStatus}, approved_at = ${approvedAt}
      WHERE id = ${req.cardId}
    `;

    return { success: true };
  }
);
