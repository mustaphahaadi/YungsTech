/*
  # Create learning path related tables

  1. New Tables
    - `learning_paths`: Main paths that users can follow
    - `modules`: Subdivisions within learning paths
    - `lessons`: Individual learning units
    - `user_progress`: Track user progress through lessons

  2. Relationships
    - Learning paths contain multiple modules
    - Modules contain multiple lessons
    - User progress tracks completion of lessons

  3. Security
    - RLS enabled on all tables
    - Policies for reading and updating data
*/

-- Learning Paths
CREATE TABLE IF NOT EXISTS learning_paths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  level VARCHAR(20),
  age_range VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Modules
CREATE TABLE IF NOT EXISTS modules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  learning_path_id uuid REFERENCES learning_paths ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  "order" INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Lessons
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id uuid REFERENCES modules ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  type VARCHAR(20),
  content JSONB,
  duration INTEGER,
  xp_reward INTEGER,
  difficulty FLOAT DEFAULT 1.0,
  "order" INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- User Progress
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users ON DELETE CASCADE,
  lesson_id uuid REFERENCES lessons ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  score FLOAT,
  time_spent INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Enable RLS
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can read learning paths"
  ON learning_paths
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Anyone can read modules"
  ON modules
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Anyone can read lessons"
  ON lessons
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Users can read own progress"
  ON user_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);