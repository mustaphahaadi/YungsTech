/*
  # Create users table and authentication

  1. New Tables
    - `users` table with custom fields for learning preferences
    - Extends Django's built-in User model
  
  2. Fields
    - All default Django user fields
    - Custom fields for learning platform
    - Authentication related fields
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(150) NOT NULL UNIQUE,
  email VARCHAR(254) NOT NULL UNIQUE,
  password VARCHAR(128) NOT NULL,
  first_name VARCHAR(150),
  last_name VARCHAR(150),
  is_active BOOLEAN DEFAULT true,
  is_staff BOOLEAN DEFAULT false,
  is_superuser BOOLEAN DEFAULT false,
  date_joined TIMESTAMPTZ DEFAULT now(),
  last_login TIMESTAMPTZ,
  avatar VARCHAR(255),
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  learning_speed VARCHAR(10) DEFAULT 'medium',
  preferred_learning_style VARCHAR(20) DEFAULT 'visual',
  daily_goal INTEGER DEFAULT 30
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);