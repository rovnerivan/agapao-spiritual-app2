CREATE TYPE moderation_status AS ENUM (
  'pending',
  'approved',
  'rejected'
);

CREATE TABLE intercession_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  confession_id UUID NOT NULL,
  summary TEXT NOT NULL,
  category TEXT,
  moderation_status moderation_status NOT NULL DEFAULT 'pending',
  prayer_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE prayer_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id UUID NOT NULL REFERENCES intercession_cards(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  duration_seconds INTEGER
);

CREATE INDEX idx_intercession_cards_status ON intercession_cards(moderation_status);
CREATE INDEX idx_intercession_cards_category ON intercession_cards(category);
CREATE INDEX idx_prayer_sessions_user_id ON prayer_sessions(user_id);
CREATE INDEX idx_prayer_sessions_card_id ON prayer_sessions(card_id);
