-- ============================================================================
-- BARIQ AUTO CARE - COMPLETE DATABASE SCHEMA
-- Aangepast met jouw specifieke tarieven en services
-- ============================================================================

-- Services tabel
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  color VARCHAR(7) DEFAULT '#dc2626',
  active BOOLEAN DEFAULT true,
  is_addon BOOLEAN DEFAULT false,
  category VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Bookings tabel
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID REFERENCES services(id),
  customer_name VARCHAR(100) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  license_plate VARCHAR(20),
  vehicle_type VARCHAR(50),
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  status VARCHAR(20) DEFAULT 'confirmed',
  notes TEXT,
  total_price DECIMAL(10,2),
  addons JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Availability tabel
CREATE TABLE IF NOT EXISTS availability (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  day_of_week INTEGER NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  active BOOLEAN DEFAULT true
);

-- Settings tabel
CREATE TABLE IF NOT EXISTS settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(50) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- BARIQ SERVICES - Hoofdpakketten
-- ============================================================================

INSERT INTO services (name, description, duration, price, is_addon, category) VALUES
('Premium Clean - Klein', 'Professionele exterieur handwas • Wielen & velgen dieptereiniging • Interieur volledige stofzuiging • Dashboard & middenconsole reiniging • Ramen binnen & buiten kristalhelder. Voor: Audi A3/A4, VW Polo/Golf, Mercedes A-Klasse, BMW 3-Serie, Tesla Model 3', 90, 90.00, false, 'klein'),
('Premium Clean - Groot', 'Professionele exterieur handwas • Wielen & velgen dieptereiniging • Interieur volledige stofzuiging • Dashboard & middenconsole reiniging • Ramen binnen & buiten kristalhelder. Voor: Mercedes S-Klasse, Audi A8, BMW X5, Range Rover, Tesla Model X, Dodge Ram, Ford Ranger, VW Amarok/Transporter', 120, 120.00, false, 'groot');

-- ============================================================================
-- BARIQ EXTRA'S - Add-ons
-- ============================================================================

INSERT INTO services (name, description, duration, price, is_addon, category) VALUES
('Dieptereiniging mattenset', 'Grondige reiniging van alle automatten. Vuil, zand en vlekken worden verwijderd zodat ze weer fris en schoon ogen.', 15, 20.00, true, 'addon'),
('Dieptereiniging stoelen', 'Intensieve reiniging van alle stoelen. Stof wordt diep schoongemaakt of leer wordt gereinigd en verzorgd, voor een frisse look en hygiëne.', 45, 100.00, true, 'addon'),
('Dieptereiniging hemelbekleding', 'Reinigen van de binnenkant van het dak (hemel). Vlekken en vetsporen worden verwijderd, zodat de bekleding weer licht en schoon is.', 30, 50.00, true, 'addon'),
('Dieptereiniging vloerbekleding', 'Diep reinigen van de volledige vloerbekleding. Verwijdert ingelopen vuil, vlekken, voor een frisse basis in de auto.', 30, 50.00, true, 'addon'),
('Dieptereiniging kofferbakbekleding', 'Grondige schoonmaak van de bekleding in de kofferbak. Ideaal tegen vlekken.', 20, 25.00, true, 'addon'),
('Plastic matteren', 'Binnenpanelen en kunststofdelen worden schoongemaakt en behandeld, zodat ze hun originele, matte uitstraling terugkrijgen (niet vet of glanzend).', 30, 50.00, true, 'addon'),
('Geurverwijdering Professional', 'Behandeling van (rook, huisdieren, vocht en andere geuren) Je auto ruikt weer fris vanbinnen.', 20, 30.00, true, 'addon');

-- ============================================================================
-- BESCHIKBAARHEID - Dinsdag t/m Zondag, 8:00-20:00 (Maandag gesloten)
-- ============================================================================

INSERT INTO availability (day_of_week, start_time, end_time, active) VALUES
(2, '08:00', '20:00', true), -- Dinsdag
(3, '08:00', '20:00', true), -- Woensdag
(4, '08:00', '20:00', true), -- Donderdag
(5, '08:00', '20:00', true), -- Vrijdag
(6, '08:00', '20:00', true), -- Zaterdag
(0, '08:00', '20:00', true); -- Zondag
-- Maandag (1) is niet beschikbaar

-- ============================================================================
-- SETTINGS
-- ============================================================================

INSERT INTO settings (key, value) VALUES
('business_name', 'Bariq Auto Care'),
('business_email', 'info@bariqautocare.nl'),
('business_phone', '0685523584'),
('service_region', 'Amsterdam en omgeving'),
('booking_buffer_minutes', '15'),
('max_bookings_per_day', '10');

-- ============================================================================
-- INDEXES voor performance
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_bookings_start_time ON bookings(start_time);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_customer_email ON bookings(customer_email);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(active);
CREATE INDEX IF NOT EXISTS idx_services_is_addon ON services(is_addon);

-- ============================================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================================

ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Public kan services lezen
DROP POLICY IF EXISTS "Public read services" ON services;
CREATE POLICY "Public read services" ON services FOR SELECT USING (active = true);

-- Public kan bookings aanmaken
DROP POLICY IF EXISTS "Public insert bookings" ON bookings;
CREATE POLICY "Public insert bookings" ON bookings FOR INSERT WITH CHECK (true);

-- Public kan eigen bookings lezen
DROP POLICY IF EXISTS "Public read bookings" ON bookings;
CREATE POLICY "Public read bookings" ON bookings FOR SELECT USING (true);

-- Public kan availability lezen
DROP POLICY IF EXISTS "Public read availability" ON availability;
CREATE POLICY "Public read availability" ON availability FOR SELECT USING (active = true);

-- Public kan settings lezen
DROP POLICY IF EXISTS "Public read settings" ON settings;
CREATE POLICY "Public read settings" ON settings FOR SELECT USING (true);

-- ============================================================================
-- TRIGGERS voor updated_at
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
CREATE TRIGGER update_bookings_updated_at 
  BEFORE UPDATE ON bookings 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_settings_updated_at ON settings;
CREATE TRIGGER update_settings_updated_at 
  BEFORE UPDATE ON settings 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- KLAAR!
-- ============================================================================
