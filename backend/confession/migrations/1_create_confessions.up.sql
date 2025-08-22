CREATE TYPE confession_category AS ENUM (
  'anger',
  'lust',
  'lies',
  'pride',
  'envy',
  'addictions',
  'relationships',
  'other'
);

CREATE TYPE confession_status AS ENUM (
  'submitted',
  'processing',
  'completed'
);

CREATE TABLE confessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  content TEXT NOT NULL CHECK (length(content) <= 2000),
  category confession_category,
  allow_intercession BOOLEAN NOT NULL DEFAULT FALSE,
  status confession_status NOT NULL DEFAULT 'submitted',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE ai_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  confession_id UUID NOT NULL REFERENCES confessions(id) ON DELETE CASCADE,
  empathy_text TEXT NOT NULL,
  bible_verse TEXT NOT NULL,
  bible_reference TEXT NOT NULL,
  reflection_text TEXT NOT NULL,
  prayer_guide TEXT NOT NULL,
  encouragement_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_confessions_user_id ON confessions(user_id);
CREATE INDEX idx_confessions_status ON confessions(status);
CREATE INDEX idx_confessions_category ON confessions(category);
CREATE INDEX idx_ai_responses_confession_id ON ai_responses(confession_id);
