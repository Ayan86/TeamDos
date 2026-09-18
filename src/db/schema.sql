-- Detectives of Supernaturals (DOS)
-- PostgreSQL Database Schema Definition
-- Created for full production deployment with foreign keys, indexes, and constraints

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. AdminUsers Table
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'investigator' CHECK (role IN ('superadmin', 'investigator', 'archivist')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    module VARCHAR(50) NOT NULL, -- 'gallery', 'media', 'vault', 'equipment'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_categories_module ON categories(module);

-- 3. SiteSettings Table
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_name VARCHAR(255) NOT NULL DEFAULT 'Detectives of Supernaturals',
    short_name VARCHAR(50) NOT NULL DEFAULT 'DOS',
    tagline VARCHAR(255) NOT NULL DEFAULT 'RISE ABOVE FEAR',
    founded_year VARCHAR(10) NOT NULL DEFAULT '2010',
    hero_heading VARCHAR(255) NOT NULL,
    hero_subheading VARCHAR(255) NOT NULL,
    hero_description TEXT NOT NULL,
    hero_bg_url TEXT NOT NULL,
    who_we_are_title VARCHAR(255) NOT NULL,
    who_we_are_description TEXT NOT NULL,
    who_we_are_points JSONB DEFAULT '[]',
    mission_heading VARCHAR(255) NOT NULL,
    mission_statement TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(100),
    contact_location VARCHAR(255),
    social_links JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. TeamMembers Table (Mandatory four initial members + management)
CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(150) NOT NULL,
    photo_url TEXT NOT NULL,
    biography TEXT DEFAULT 'Profile information coming soon.',
    expertise VARCHAR(255) DEFAULT '',
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE NULL
);

CREATE INDEX IF NOT EXISTS idx_team_members_order ON team_members(display_order) WHERE deleted_at IS NULL;

-- 5. Investigations Table
CREATE TABLE IF NOT EXISTS investigations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    investigation_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('OPEN', 'UNDER_INVESTIGATION', 'DOCUMENTED', 'CLOSED', 'ARCHIVED')),
    short_description TEXT NOT NULL,
    full_report TEXT,
    hero_image TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    findings TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE NULL
);

CREATE INDEX IF NOT EXISTS idx_investigations_status ON investigations(status);
CREATE INDEX IF NOT EXISTS idx_investigations_featured ON investigations(is_featured);

-- 6. InvestigationImages Table
CREATE TABLE IF NOT EXISTS investigation_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    investigation_id UUID NOT NULL REFERENCES investigations(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_investigation_images_inv ON investigation_images(investigation_id);

-- 7. GalleryImages Table
CREATE TABLE IF NOT EXISTS gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    caption TEXT,
    image_url TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    location VARCHAR(255),
    date DATE,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE NULL
);

CREATE INDEX IF NOT EXISTS idx_gallery_images_category ON gallery_images(category);

-- 8. MediaCoverage Table
CREATE TABLE IF NOT EXISTS media_coverage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    publication VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    external_url TEXT,
    video_url TEXT,
    thumbnail TEXT NOT NULL,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE NULL
);

CREATE INDEX IF NOT EXISTS idx_media_coverage_cat ON media_coverage(category);

-- 9. VaultCases Table (Classified Paranormal Archive)
CREATE TABLE IF NOT EXISTS vault_cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id VARCHAR(50) UNIQUE NOT NULL, -- e.g. DOS-VLT-042
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    investigation_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('OPEN', 'UNDER_INVESTIGATION', 'DOCUMENTED', 'CLOSED', 'ARCHIVED')),
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    findings TEXT NOT NULL,
    classification_level VARCHAR(100) DEFAULT 'PUBLIC ARCHIVE',
    redacted_summary TEXT,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE NULL
);

CREATE INDEX IF NOT EXISTS idx_vault_cases_caseid ON vault_cases(case_id);
CREATE INDEX IF NOT EXISTS idx_vault_cases_status ON vault_cases(status);

-- 10. VaultEvidence Table
CREATE TABLE IF NOT EXISTS vault_evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID NOT NULL REFERENCES vault_cases(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('audio', 'video', 'photo', 'document', 'sensor_log')),
    file_url TEXT NOT NULL,
    audio_waveform JSONB,
    description TEXT,
    classified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_vault_evidence_case ON vault_evidence(case_id);

-- 11. Equipment Table
CREATE TABLE IF NOT EXISTS equipment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    model_number VARCHAR(100),
    manufacturer VARCHAR(150),
    description TEXT NOT NULL,
    specs JSONB DEFAULT '{}',
    image_url TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Operational',
    detection_method VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE NULL
);

CREATE INDEX IF NOT EXISTS idx_equipment_category ON equipment(category);

-- 12. ActivityReports Table (Public Paranormal Activity Submissions)
CREATE TABLE IF NOT EXISTS activity_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id VARCHAR(50) UNIQUE NOT NULL, -- e.g. DOS-2026-000001
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    location VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    date_of_activity DATE NOT NULL,
    approximate_time VARCHAR(50) NOT NULL,
    activity_type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    number_of_witnesses INTEGER DEFAULT 1,
    previous_investigation BOOLEAN DEFAULT FALSE,
    additional_info TEXT,
    status VARCHAR(50) DEFAULT 'New' CHECK (status IN ('New', 'Reviewing', 'Contacted', 'Investigation Scheduled', 'Investigating', 'Closed', 'Archived')),
    internal_notes TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_activity_reports_case_id ON activity_reports(case_id);
CREATE INDEX IF NOT EXISTS idx_activity_reports_status ON activity_reports(status);

-- 13. ReportAttachments Table
CREATE TABLE IF NOT EXISTS report_attachments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID NOT NULL REFERENCES activity_reports(id) ON DELETE CASCADE,
    file_url TEXT NOT NULL,
    file_type VARCHAR(50),
    file_size BIGINT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_report_attachments_report ON report_attachments(report_id);

-- 14. ContactMessages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
