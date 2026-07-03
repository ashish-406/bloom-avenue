-- ============================================================
-- Bloom Avenue Le Spa — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  price TEXT DEFAULT 'Price TBC',
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_name TEXT NOT NULL,
  service_category TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  notes TEXT,
  juice_reference TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  -- Prevents double-booking the same slot atomically (pairs with app-level check)
  CONSTRAINT bookings_slot_unique UNIQUE (booking_date, booking_time)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_bookings_date   ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- ============================================================
-- Row Level Security
-- ============================================================
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Anyone can read services (used by the public booking page)
CREATE POLICY "services_select" ON services FOR SELECT USING (true);

-- Anyone can create a booking via the public form
-- (server route validates all fields before insert)
CREATE POLICY "bookings_insert" ON bookings FOR INSERT WITH CHECK (true);

-- Direct reads of bookings are blocked for anon key holders.
-- All booking reads go through our server API routes which use
-- the service_role key (bypasses RLS) — protecting client PII.
CREATE POLICY "bookings_select" ON bookings FOR SELECT USING (false);

-- ============================================================
-- Migration: apply to existing databases
-- Run these ALTER statements if you already have the tables:
-- ============================================================
-- ALTER TABLE bookings ADD CONSTRAINT bookings_slot_unique UNIQUE (booking_date, booking_time);
-- DROP POLICY IF EXISTS "bookings_select" ON bookings;
-- CREATE POLICY "bookings_select" ON bookings FOR SELECT USING (false);

-- ============================================================
-- Seed: Services
-- ============================================================
INSERT INTO services (name, category, duration_minutes, price, description) VALUES
  ('Advanced Skin Care Facial', 'Skin Care', 75,  'Price TBC', 'Deep cleansing and rejuvenating facial treatment'),
  ('Anti-Aging Facial',         'Skin Care', 60,  'Price TBC', 'Reduce fine lines and restore youthful radiance'),
  ('Brightening Facial',        'Skin Care', 60,  'Price TBC', 'Even skin tone and reveal your natural glow'),
  ('Acne Treatment Facial',     'Skin Care', 60,  'Price TBC', 'Targeted treatment for clearer, healthier skin'),
  ('Relaxation Massage',        'Massage',   60,  'Price TBC', 'Full-body tension release for total tranquility'),
  ('Deep Tissue Massage',       'Massage',   90,  'Price TBC', 'Targeted relief for deep muscle tension'),
  ('Body Scrub & Wrap',         'Massage',   90,  'Price TBC', 'Exfoliating and nourishing full body treatment'),
  ('Aromatherapy Massage',      'Massage',   60,  'Price TBC', 'Soothing massage with premium essential oils'),
  ('Manicure',                  'Nails',     45,  'Price TBC', 'Classic nail care and polish for beautiful hands'),
  ('Pedicure',                  'Nails',     45,  'Price TBC', 'Relaxing foot treatment and nail polish'),
  ('Gel Nails',                 'Nails',     60,  'Price TBC', 'Long-lasting gel polish for a flawless finish'),
  ('Nail Art',                  'Nails',     60,  'Price TBC', 'Creative designs to express your unique style'),
  ('Mani-Pedi Combo',           'Nails',     90,  'Price TBC', 'Our most-booked complete hand and foot treatment'),
  ('Haircut & Styling',         'Hair',      60,  'Price TBC', 'Expert cut and style to suit your look'),
  ('Keratin Treatment',         'Hair',      120, 'Price TBC', 'Smooth, frizz-free hair for weeks'),
  ('Hair Colouring',            'Hair',      120, 'Price TBC', 'Vibrant, professional colour results'),
  ('Blowdry & Finish',          'Hair',      45,  'Price TBC', 'Salon-perfect blowout and styling'),
  ('Full Body Wax',             'Waxing',    90,  'Price TBC', 'Complete smooth skin waxing treatment'),
  ('Eyebrow Wax & Tint',        'Waxing',    30,  'Price TBC', 'Perfectly shaped and defined brows'),
  ('Lip & Facial Wax',          'Waxing',    30,  'Price TBC', 'Precise hair removal for a clean finish'),
  ('Couple Package',            'Packages',  120, 'Price TBC', 'Romantic spa experience for two'),
  ('Bridal Package',            'Packages',  180, 'Price TBC', 'Full beauty prep for brides'),
  ('Birthday Pamper Package',   'Packages',  120, 'Price TBC', 'The perfect celebration treat'),
  ('Full Day Retreat',          'Packages',  480, 'Price TBC', 'An entire day of blissful treatments')
ON CONFLICT DO NOTHING;
