-- Detectives of Supernatural (DOS) - Database Schema
-- Reference SQL Schema for Relational Storage & Migration

CREATE TABLE IF NOT EXISTS settings (
  id VARCHAR(64) PRIMARY KEY DEFAULT 'current',
  organization_name VARCHAR(255) NOT NULL,
  short_name VARCHAR(32) NOT NULL,
  tagline VARCHAR(255) NOT NULL,
  founded_year VARCHAR(8) NOT NULL,
  hero_heading VARCHAR(255) NOT NULL,
  hero_subheading VARCHAR(255) NOT NULL,
  hero_description TEXT NOT NULL,
  hero_bg_url TEXT NOT NULL,
  who_we_are_title VARCHAR(255) NOT NULL,
  who_we_are_description TEXT NOT NULL,
  who_we_are_points JSONB NOT NULL DEFAULT '[]',
  mission_heading VARCHAR(255) NOT NULL,
  mission_statement TEXT NOT NULL,
  contact_email VARCHAR(255) NOT NULL,
  contact_phone VARCHAR(64) NOT NULL,
  contact_location VARCHAR(255) NOT NULL,
  social_links JSONB NOT NULL DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS team_members (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  photo_url TEXT NOT NULL,
  biography TEXT NOT NULL,
  expertise VARCHAR(255) NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS investigations (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  investigation_date DATE NOT NULL,
  status VARCHAR(64) NOT NULL DEFAULT 'Completed',
  short_description TEXT NOT NULL,
  full_report TEXT NOT NULL,
  hero_image TEXT NOT NULL,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  evidence_count INT NOT NULL DEFAULT 0,
  findings JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vault_cases (
  id VARCHAR(64) PRIMARY KEY,
  case_id VARCHAR(64) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  investigation_date DATE NOT NULL,
  status VARCHAR(64) NOT NULL,
  category VARCHAR(128) NOT NULL,
  description TEXT NOT NULL,
  findings TEXT NOT NULL,
  classification_level VARCHAR(64) NOT NULL DEFAULT 'Tier 1 - Public',
  redacted_summary TEXT NOT NULL,
  evidence_items JSONB NOT NULL DEFAULT '[]',
  is_public BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS equipment (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(128) NOT NULL,
  model_number VARCHAR(128) NOT NULL,
  manufacturer VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  specs JSONB NOT NULL DEFAULT '[]',
  image_url TEXT NOT NULL,
  status VARCHAR(64) NOT NULL DEFAULT 'Operational',
  detection_method VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS media_items (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  publication VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  category VARCHAR(64) NOT NULL,
  description TEXT NOT NULL,
  external_url TEXT,
  video_url TEXT,
  thumbnail TEXT NOT NULL,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gallery_items (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  caption TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category VARCHAR(64) NOT NULL,
  location VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS research_papers (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(128) NOT NULL,
  author VARCHAR(255) NOT NULL,
  publication_date DATE NOT NULL,
  abstract TEXT NOT NULL,
  full_content TEXT NOT NULL,
  findings JSONB NOT NULL DEFAULT '[]',
  image_url TEXT,
  video_url TEXT,
  tags JSONB NOT NULL DEFAULT '[]',
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS activity_reports (
  id VARCHAR(64) PRIMARY KEY,
  case_id VARCHAR(64) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(64),
  location VARCHAR(255) NOT NULL,
  city VARCHAR(128) NOT NULL,
  state VARCHAR(128) NOT NULL,
  date_of_activity DATE NOT NULL,
  approximate_time VARCHAR(64) NOT NULL,
  activity_type VARCHAR(128) NOT NULL,
  description TEXT NOT NULL,
  number_of_witnesses INT DEFAULT 1,
  previous_investigation BOOLEAN DEFAULT FALSE,
  attachments JSONB NOT NULL DEFAULT '[]',
  additional_info TEXT,
  status VARCHAR(64) NOT NULL DEFAULT 'Pending',
  internal_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(64),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
