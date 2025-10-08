-- 🔒 DUPLICATE BOOKING PREVENTION
-- Dit voorkomt dubbele boekingen op database niveau

-- Voer dit uit in je Supabase SQL Editor:

-- 1. Voeg een functie toe om overlappende boekingen te checken
CREATE OR REPLACE FUNCTION check_booking_overlap()
RETURNS TRIGGER AS $$
BEGIN
  -- Check of er al een bevestigde boeking bestaat die overlapt
  IF EXISTS (
    SELECT 1 FROM bookings
    WHERE id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)
    AND status != 'cancelled'
    AND (
      -- Check voor elke vorm van overlap
      (NEW.start_time >= start_time AND NEW.start_time < end_time) OR
      (NEW.end_time > start_time AND NEW.end_time <= end_time) OR
      (NEW.start_time <= start_time AND NEW.end_time >= end_time)
    )
  ) THEN
    RAISE EXCEPTION 'Dit tijdslot is al bezet. Kies een ander tijdslot.';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. Voeg trigger toe aan bookings tabel
DROP TRIGGER IF EXISTS prevent_booking_overlap ON bookings;
CREATE TRIGGER prevent_booking_overlap
  BEFORE INSERT OR UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION check_booking_overlap();

-- 3. Maak indexes voor snellere overlap checks
CREATE INDEX IF NOT EXISTS idx_bookings_start_time 
ON bookings (start_time) 
WHERE status != 'cancelled';

CREATE INDEX IF NOT EXISTS idx_bookings_end_time 
ON bookings (end_time) 
WHERE status != 'cancelled';

CREATE INDEX IF NOT EXISTS idx_bookings_status 
ON bookings (status);

-- 4. Test de constraint (optioneel - voer alleen uit als je wilt testen)
-- Uncomment onderstaande regels om te testen:

-- INSERT INTO bookings (
--   service_id, 
--   customer_name, 
--   customer_email, 
--   start_time, 
--   end_time, 
--   status
-- ) VALUES (
--   (SELECT id FROM services LIMIT 1),
--   'Test User',
--   'test@test.com',
--   '2025-01-15 10:00:00+00',
--   '2025-01-15 12:00:00+00',
--   'confirmed'
-- );

-- -- Deze zou moeten falen:
-- INSERT INTO bookings (
--   service_id, 
--   customer_name, 
--   customer_email, 
--   start_time, 
--   end_time, 
--   status
-- ) VALUES (
--   (SELECT id FROM services LIMIT 1),
--   'Test User 2',
--   'test2@test.com',
--   '2025-01-15 10:30:00+00',  -- Overlapt met vorige boeking
--   '2025-01-15 12:30:00+00',
--   'confirmed'
-- );

-- ✅ KLAAR! Je systeem is nu volledig beschermd tegen dubbele boekingen!
