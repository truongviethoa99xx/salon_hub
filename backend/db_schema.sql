-- =====================================================================
-- DDL SCRIPT FOR SALON HUB POSTGRESQL DATABASE
-- Author: Database Architect
-- Description: This script sets up the core tables, types, and
--              relationships for the Smart Salon Ecosystem.
-- =====================================================================

-- Enable UUID generation function
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================================
-- TYPE DEFINITIONS
-- =====================================================================

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('ADMIN', 'STAFF', 'CUSTOMER');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'resource_type') THEN
        CREATE TYPE resource_type AS ENUM ('CUT_CHAIR', 'SHAMPOO_BED');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'booking_status') THEN
        CREATE TYPE booking_status AS ENUM ('SCHEDULED', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'queue_status') THEN
        CREATE TYPE queue_status AS ENUM ('WAITING', 'WASHING', 'DONE');
    END IF;
END$$;


-- =====================================================================
-- TABLE: branches
-- Description: Stores information about each salon location.
-- =====================================================================
CREATE TABLE IF NOT EXISTS branches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    address TEXT,
    phone_number VARCHAR(20),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================================
-- TABLE: users
-- Description: Stores user information for customers, staff, and admins.
-- =====================================================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL UNIQUE,
    password_hash TEXT, -- Nullable for customers who don't set a password
    role user_role NOT NULL DEFAULT 'CUSTOMER',
    branch_id UUID REFERENCES branches(id) ON DELETE SET NULL, -- Staff are assigned to a branch
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================================
-- TABLE: services
-- Description: Defines the services offered by the salon.
-- =====================================================================
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    
    -- duration_minutes: Time the primary resource (e.g., cutting stylist) is occupied.
    duration_minutes INT NOT NULL CHECK (duration_minutes > 0),
    
    -- processing_gap_minutes: Optional wait time after the service before the next step (e.g., hair dye processing time before washing).
    processing_gap_minutes INT NOT NULL DEFAULT 0 CHECK (processing_gap_minutes >= 0),

    requires_shampoo_bed BOOLEAN NOT NULL DEFAULT FALSE,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================================
-- TABLE: salon_resources
-- Description: Represents the physical, limited resources at each branch.
-- =====================================================================
CREATE TABLE IF NOT EXISTS salon_resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    type resource_type NOT NULL,
    name VARCHAR(100) NOT NULL, -- e.g., "Ghế Cắt 01", "Giường Gội A"
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Each resource must have a unique name within its branch
    UNIQUE(branch_id, name)
);

-- =====================================================================
-- TABLE: bookings
-- Description: Core table for storing customer appointment details.
-- =====================================================================
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    stylist_id UUID REFERENCES users(id) ON DELETE SET NULL, -- Can be null if customer doesn't choose a specific stylist
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    
    status booking_status NOT NULL DEFAULT 'SCHEDULED',
    notes TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT check_end_time CHECK (end_time > start_time)
);

-- =====================================================================
-- TABLE: booking_queue
-- Description: Manages the FIFO queue for services like shampooing.
-- =====================================================================
CREATE TABLE IF NOT EXISTS booking_queue (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- A booking can only be in the queue once. If the booking is deleted, the queue item is removed.
    booking_id UUID NOT NULL UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
    
    status queue_status NOT NULL DEFAULT 'WAITING',
    
    -- priority_score: Higher value means higher priority (e.g., for chemical treatments needing urgent washing).
    priority_score INT NOT NULL DEFAULT 0,
    
    entered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), -- Timestamp for FIFO ordering
    started_at TIMESTAMPTZ, -- When the service (e.g., washing) begins
    finished_at TIMESTAMPTZ, -- When the service ends
    
    serviced_by_staff_id UUID REFERENCES users(id) ON DELETE SET NULL, -- The staff member who handled this queue item
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================================
-- INDEXES
-- For performance optimization on frequently queried columns.
-- =====================================================================
CREATE INDEX IF NOT EXISTS idx_users_phone_number ON users(phone_number);
CREATE INDEX IF NOT EXISTS idx_resources_branch_id ON salon_resources(branch_id);
CREATE INDEX IF NOT EXISTS idx_bookings_customer_id ON bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_stylist_id ON bookings(stylist_id);
CREATE INDEX IF NOT EXISTS idx_bookings_branch_id ON bookings(branch_id);
CREATE INDEX IF NOT EXISTS idx_bookings_start_time ON bookings(start_time);
CREATE INDEX IF NOT EXISTS idx_queue_status ON booking_queue(status);
CREATE INDEX IF NOT EXISTS idx_queue_entered_at ON booking_queue(entered_at);


-- =====================================================================
-- TABLE: service_records
-- Description: Log of completed services for CRM purposes.
-- =====================================================================
CREATE TABLE IF NOT EXISTS service_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    service_date DATE NOT NULL,
    recommended_return_date DATE,
    notes TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_service_records_customer_id ON service_records(customer_id);
CREATE INDEX IF NOT EXISTS idx_service_records_recommended_return_date ON service_records(recommended_return_date);


-- =====================================================================
-- TABLE: notification_history
-- Description: Log of sent notifications to customers.
-- =====================================================================
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'notification_status') THEN
        CREATE TYPE notification_status AS ENUM ('PENDING', 'SUCCESS', 'FAILED');
    END IF;
END$$;

CREATE TABLE IF NOT EXISTS notification_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    status notification_status NOT NULL DEFAULT 'PENDING',
    sent_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notification_history_customer_id ON notification_history(customer_id);


-- =====================================================================
-- TYPE DEFINITIONS FOR WEBHOOKS
-- =====================================================================
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'social_platform') THEN
        CREATE TYPE social_platform AS ENUM ('FACEBOOK', 'ZALO');
    END IF;
END$$;


-- =====================================================================
-- TABLE: social_accounts
-- Description: Links internal users to their social media IDs.
-- =====================================================================
CREATE TABLE IF NOT EXISTS social_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    platform social_platform NOT NULL,
    social_user_id VARCHAR(255) NOT NULL, -- The ID from Facebook/Zalo
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    UNIQUE(platform, social_user_id)
);
CREATE INDEX IF NOT EXISTS idx_social_accounts_user_id ON social_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_social_accounts_platform_social_user_id ON social_accounts(platform, social_user_id);


-- =====================================================================
-- TABLE: conversations
-- Description: Stores incoming messages from social platforms.
-- =====================================================================
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES users(id) ON DELETE SET NULL, -- Can be null if message comes from an unknown user
    platform social_platform NOT NULL,
    social_user_id VARCHAR(255) NOT NULL, -- The ID from Facebook/Zalo
    message_text TEXT NOT NULL,
    message_timestamp TIMESTAMPTZ NOT NULL, -- Original timestamp from social platform
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_conversations_customer_id ON conversations(customer_id);
CREATE INDEX IF NOT EXISTS idx_conversations_platform_social_user_id ON conversations(platform, social_user_id);


-- =====================================================================
-- TABLE: stylist_shifts
-- Description: Stores the working shifts for each stylist.
-- =====================================================================
CREATE TABLE IF NOT EXISTS stylist_shifts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    stylist_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    shift_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- A stylist can only have one shift per day at a given branch
    UNIQUE(stylist_id, branch_id, shift_date)
);

CREATE INDEX IF NOT EXISTS idx_shifts_stylist_date ON stylist_shifts(stylist_id, shift_date);


-- =====================================================================
-- END OF SCRIPT
-- =====================================================================
