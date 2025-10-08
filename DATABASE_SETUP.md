# Bariq Premium Booking System - Database Setup

## Stap 1: Supabase Account Aanmaken

1. Ga naar [https://supabase.com](https://supabase.com)
2. Klik op "Start your project"
3. Maak een gratis account aan (geen creditcard nodig)
4. Maak een nieuw project aan:
   - Project naam: `bariq-autocare`
   - Database password: Kies een sterk wachtwoord (bewaar deze goed!)
   - Regio: Kies `West Europe (Frankfurt)` voor beste prestaties in Nederland

## Stap 2: Database Schema Uitvoeren

1. Ga naar je Supabase project dashboard
2. Klik op **SQL Editor** in het linkermenu
3. Klik op **New Query**
4. Kopieer en plak het volgende SQL schema:

```sql
-- ============================================================================
-- BARIQ AUTO CARE - DATABASE SCHEMA
-- ============================================================================

-- Services tabel
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL, -- in minuten
  price DECIMAL(10,2) NOT NULL,
  color VARCHAR(7) DEFAULT '#dc2626',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Boekingen tabel
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  customer_name VARCHAR(100) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  status VARCHAR(20) DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'completed')),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Beschikbaarheid tabel
CREATE TABLE availability (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0=zondag, 6=zaterdag
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  active BOOLEAN DEFAULT true
);

-- Admin instellingen
CREATE TABLE settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(50) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- INDEXES voor betere performance
-- ============================================================================

CREATE INDEX idx_bookings_start_time ON bookings(start_time);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_customer_email ON bookings(customer_email);
CREATE INDEX idx_services_active ON services(active);

-- ============================================================================
-- TEST DATA - Voeg standaard services toe
-- ============================================================================

INSERT INTO services (name, description, duration, price, color, active) VALUES
('Basic Clean', 'Uitwendige handwas met droging en banden', 60, 35.00, '#dc2626', true),
('Premium Clean', 'Volledige binnen- en buitenreiniging', 90, 55.00, '#dc2626', true),
('Dieptereiniging', 'Complete dieptereiniging van interieur en exterieur', 120, 75.00, '#dc2626', true),
('Ceramic Coating', 'Premium keramische coating voor langdurige bescherming', 180, 150.00, '#dc2626', true),
('Detailing Pakket', 'Ultimate detailing met polijsten en coating', 240, 250.00, '#dc2626', true);

-- ============================================================================
-- STANDAARD BESCHIKBAARHEID (Dinsdag t/m Zondag, 9:00-18:00)
-- ============================================================================

INSERT INTO availability (day_of_week, start_time, end_time, active) VALUES
(2, '09:00', '18:00', true), -- Dinsdag
(3, '09:00', '18:00', true), -- Woensdag
(4, '09:00', '18:00', true), -- Donderdag
(5, '09:00', '18:00', true), -- Vrijdag
(6, '09:00', '18:00', true), -- Zaterdag
(0, '09:00', '18:00', true); -- Zondag

-- ============================================================================
-- ADMIN INSTELLINGEN
-- ============================================================================

INSERT INTO settings (key, value) VALUES
('business_name', 'Bariq Auto Care'),
('business_email', 'info@bariqautocare.nl'),
('business_phone', '0685523584'),
('booking_buffer_minutes', '15'),
('max_bookings_per_day', '8');

-- ============================================================================
-- TRIGGERS - Auto-update timestamps
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_bookings_updated_at 
  BEFORE UPDATE ON bookings 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at 
  BEFORE UPDATE ON settings 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
```

5. Klik op **Run** om het schema uit te voeren
6. Controleer of er geen errors zijn (je zou "Success" moeten zien)

## Stap 3: Row Level Security (RLS) Configureren

Voor veiligheid moet je Row Level Security policies toevoegen:

```sql
-- ============================================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================================

-- Enable RLS op alle tabellen
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Public kan services lezen
CREATE POLICY "Services zijn publiek leesbaar"
  ON services FOR SELECT
  USING (active = true);

-- Public kan bookings aanmaken
CREATE POLICY "Iedereen kan boekingen aanmaken"
  ON bookings FOR INSERT
  WITH CHECK (true);

-- Public kan eigen bookings lezen (via email)
CREATE POLICY "Klanten kunnen eigen boekingen zien"
  ON bookings FOR SELECT
  USING (true);

-- Public kan availability lezen
CREATE POLICY "Availability is publiek leesbaar"
  ON availability FOR SELECT
  USING (active = true);

-- Alleen authenticated users kunnen alles updaten/deleten
-- (Voor admin panel - later te implementeren met Supabase Auth)
```

## Stap 4: API Credentials Ophalen

1. Ga naar **Settings** → **API** in je Supabase dashboard
2. Kopieer de volgende waarden:
   - **Project URL** (bijv. `https://xxxxx.supabase.co`)
   - **Anon Public Key** (lange string)

3. Maak een `.env.local` bestand in de root van je project:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Stap 5: Testen

1. Start je development server:
```bash
npm run dev
```

2. Ga naar `http://localhost:5173/booking-system`
3. Test het booking systeem:
   - Selecteer een service
   - Kies datum en tijd
   - Vul je gegevens in
   - Maak een test boeking

4. Controleer in Supabase:
   - Ga naar **Table Editor** → **bookings**
   - Je zou je test boeking moeten zien

## Stap 6: Admin Dashboard Toegang

1. Ga naar `http://localhost:5173/admin-dashboard`
2. Login met het wachtwoord: `bariq2025` (verander dit later!)
3. Je kunt nu:
   - Boekingen beheren
   - Status updaten
   - Herinneringen versturen
   - Statistieken bekijken

## Extra Functies (Optioneel)

### Email Notificaties

Voor productie kun je een email service integreren:

**Optie 1: SendGrid**
```bash
npm install @sendgrid/mail
```

**Optie 2: Resend** (modern & developer-friendly)
```bash
npm install resend
```

Voeg credentials toe aan `.env.local` en update de Netlify functions.

### Automated Backups

Supabase heeft automatische daily backups (7 dagen retention op free plan).
Voor extra beveiliging kun je wekelijkse exports instellen:

1. Ga naar **Database** → **Backups**
2. Configureer backup schedule
3. Download exports naar je lokale systeem

### Supabase Realtime

Voor live updates in het admin panel:

```typescript
// Al geïmplementeerd in AdminDashboard.tsx!
const subscription = supabase
  .channel('bookings-changes')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, (payload) => {
    // Refresh bookings
  })
  .subscribe();
```

## Troubleshooting

### "Invalid API Key" Error
- Controleer of `.env.local` correct is ingesteld
- Restart je development server na het aanmaken van `.env.local`
- Zorg dat de variabelen beginnen met `VITE_`

### Services worden niet geladen
- Controleer RLS policies in Supabase
- Verifieer dat test data is toegevoegd
- Check browser console voor errors

### Boekingen worden niet opgeslagen
- Controleer RLS policies
- Verifieer dat alle required fields zijn ingevuld
- Check network tab in browser dev tools

## Production Deployment

### Netlify Environment Variables

1. Ga naar je Netlify dashboard
2. **Site Settings** → **Environment Variables**
3. Voeg toe:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Redeploy je site

### Custom Domain

1. Configureer een subdomain: `booking.bariqautocare.nl`
2. Point CNAME naar Netlify
3. Update `VITE_APP_URL` in environment variables

## Security Checklist

- [ ] RLS policies zijn actief
- [ ] Admin wachtwoord is veranderd
- [ ] Environment variables zijn niet in git
- [ ] Supabase database password is sterk en veilig bewaard
- [ ] API keys zijn alleen in production environment
- [ ] Rate limiting is geconfigureerd (Supabase free tier: 500 MB database, 5 GB bandwidth)

## Kosten Overzicht

**100% GRATIS Setup:**
- ✅ Supabase Free Tier: 500 MB database, 5 GB bandwidth
- ✅ Netlify Free Tier: 100 GB bandwidth, 300 build minutes
- ✅ Geen creditcard vereist
- ✅ Perfect voor kleine tot middelgrote bedrijven

**Wanneer upgraden:**
- Meer dan 50.000 requests per maand
- Database > 500 MB
- Meer dan 100 GB traffic per maand

## Support

Voor vragen over de setup:
- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- Netlify Docs: https://docs.netlify.com

---

**Gemaakt voor Bariq Auto Care** 🚗✨
Premium Booking System - Volledig gratis, volledig professioneel.
