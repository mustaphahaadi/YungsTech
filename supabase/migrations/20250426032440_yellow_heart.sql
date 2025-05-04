/*
  # Create gamification related tables

  1. New Tables
    - `achievements`: Available achievements
    - `user_achievements`: Track unlocked achievements
    - `streaks`: User learning streaks
    - `daily_challenges`: Daily tasks for users

  2. Relationships
    - Users can unlock multiple achievements
    - Each user has one streak record
    - Daily challenges are available to all users

  3. Security
    - RLS enabled on all tables
    - Policies for reading and updating data
*/

-- Achievements
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  criteria JSONB,
  xp_reward INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- User Achievements
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users ON DELETE CASCADE,
  achievement_id uuid REFERENCES achievements ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, achievement_id)
);

-- Streaks
CREATE TABLE IF NOT EXISTS streaks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users ON DELETE CASCADE UNIQUE,
  current INTEGER DEFAULT 0,
  longest INTEGER DEFAULT 0,
  last_activity_date DATE NOT NULL,
  protection_available BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Daily Challenges
CREATE TABLE IF NOT EXISTS daily_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  difficulty VARCHAR(10),
  type VARCHAR(20),
  content JSONB,
  xp_reward INTEGER,
  available_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_challenges ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can read achievements"
  ON achievements
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Users can read own achievements"
  ON user_achievements
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read own streak"
  ON streaks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own streak"
  ON streaks
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can read daily challenges"
  ON daily_challenges
  FOR SELECT
  TO PUBLIC
  USING (true);