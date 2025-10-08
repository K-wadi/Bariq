# 🚀 Snelle Setup Instructies - Je bent bijna klaar!

## ✅ Wat je hebt:

Je Supabase database credentials zijn ontvangen!

**Project URL:** `https://mkbcygfabffxhyotlcgj.supabase.co`

## 📝 Volgende 3 Stappen (5 minuten):

### Stap 1: Haal je Anon Key op (2 min)

1. **Open:** https://supabase.com/dashboard/project/mkbcygfabffxhyotlcgj/settings/api

2. **Kopieer** de **"anon public"** key (lange string onder "Project API keys")

3. **Update** `.env.local` in je project root:
   ```env
   VITE_SUPABASE_URL=https://mkbcygfabffxhyotlcgj.supabase.co
   VITE_SUPABASE_ANON_KEY=jouw-gekopieerde-anon-key-hier
   VITE_ADMIN_PASSWORD=bariq2025
   VITE_APP_NAME=Bariq Auto Care
   VITE_APP_URL=http://localhost:5173
   ```

### Stap 2: Database Schema Uitvoeren (2 min)

1. **Open SQL Editor:** https://supabase.com/dashboard/project/mkbcygfabffxhyotlcgj/sql

2. **Klik** op "New Query"

3. **Open** het bestand `DATABASE_SETUP.md` in dit project

4. **Kopieer** het volledige SQL schema (vanaf `CREATE TABLE services...` tot het einde)

5. **Plak** in de SQL Editor

6. **Klik** op "Run" (of druk F5)

7. **Zie je "Success"?** Perfect! ✅

### Stap 3: Start de App (1 min)

```bash
npm run dev
```

Open je browser:
- **Booking Systeem:** http://localhost:5173/booking-system
- **Admin Dashboard:** http://localhost:5173/admin-dashboard

## 🎯 Quick Test

### Test Booking:
1. Ga naar `/booking-system`
2. Kies "Basic Clean" service
3. Selecteer morgen als datum
4. Kies 10:00 als tijd
5. Vul je naam en email in
6. Klik "Bevestig Boeking"
7. ✅ Zie je de bevestiging? Perfect!

### Test Admin:
1. Ga naar `/admin-dashboard`
2. Login met wachtwoord: `bariq2025`
3. ✅ Zie je je test booking? Gelukt!

## ✨ Het werkt niet?

### "Services worden niet geladen"
```bash
# Check .env.local
cat .env.local  # (of open in editor)

# Restart server
npm run dev
```

### "Invalid API Key"
- Zorg dat je de **anon public** key gebruikt (niet service_role!)
- Check of er geen spaties voor/na de key staan
- Restart de development server

### "Table does not exist"
- SQL schema is nog niet uitgevoerd
- Ga terug naar Stap 2 en voer het schema uit

## 🎊 Success!

Als alles werkt, heb je nu:
- ✅ Werkend booking systeem op `/booking-system`
- ✅ Admin dashboard op `/admin-dashboard`
- ✅ Real-time database synchronisatie
- ✅ Email templates (klaar voor productie)

## 📚 Volledige Documentatie

Voor meer details, zie:
- `DATABASE_SETUP.md` - Volledige database guide
- `SUPABASE_CREDENTIALS.md` - Je credentials info
- `QUICK_START.md` - Complete setup guide
- `IMPLEMENTATION_GUIDE.md` - Features en customization

## 🚀 Klaar voor Productie?

Zie `IMPLEMENTATION_GUIDE.md` sectie "Deployment" voor Netlify setup.

---

**Need help?** Check de troubleshooting sectie in `QUICK_START.md`

**Questions?** Alle info staat in de documentatie bestanden.

**Ready to rock? Let's go! 🚗✨**
