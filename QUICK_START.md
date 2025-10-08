# ⚡ Quick Start Guide - Bariq Booking System

## 🎯 Wat heb je nodig?
- ✅ Node.js geïnstalleerd
- ✅ 5 minuten tijd
- ✅ Geen creditcard
- ✅ Geen coding ervaring nodig

## 📋 Stap-voor-stap (5 minuten)

### Stap 1: Supabase Account (2 min)

1. **Ga naar:** [https://supabase.com](https://supabase.com)
2. **Klik:** "Start your project"
3. **Sign up** met GitHub of Email
4. **Maak nieuw project:**
   - Project naam: `bariq-autocare`
   - Database password: Kies een sterk wachtwoord (bewaar goed!)
   - Region: `West Europe (Frankfurt)`
   - Klik "Create new project"

⏱️ Wacht 2 minuten terwijl je project wordt opgezet...

### Stap 2: Database Aanmaken (2 min)

1. **In Supabase dashboard:**
   - Klik op **SQL Editor** (links in menu)
   - Klik op **New Query**

2. **Open `DATABASE_SETUP.md`** in deze repository

3. **Kopieer het hele SQL schema** (vanaf `CREATE TABLE services...`)

4. **Plak in SQL Editor** en klik **Run**

5. **Zie "Success"?** Perfect! Database is klaar ✅

### Stap 3: API Keys Ophalen (1 min)

1. **Klik:** Settings (tandwiel icoon links onderaan)
2. **Klik:** API
3. **Kopieer:**
   - ✅ Project URL (bijv. `https://abcdefgh.supabase.co`)
   - ✅ Anon Public Key (lange string)

### Stap 4: Project Configureren (< 1 min)

1. **Maak bestand:** `.env.local` in je project root

2. **Plak erin:**
```env
VITE_SUPABASE_URL=https://jouw-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=jouw-anon-key-hier
```

3. **Vervang** de waarden met je eigen keys

### Stap 5: Start de App! (< 1 min)

```bash
# Installeer dependencies
npm install

# Start development server
npm run dev
```

## 🎉 Klaar! Test het nu:

### Test Booking Systeem:
1. Open: `http://localhost:5173/booking-system`
2. Kies een service
3. Selecteer datum & tijd
4. Vul je gegevens in
5. Klik "Bevestig Boeking"

### Test Admin Dashboard:
1. Open: `http://localhost:5173/admin-dashboard`
2. Login met wachtwoord: `bariq2025`
3. Zie je test boeking verschijnen!

## 🚀 Deploy naar Productie (5 min)

### Via Netlify (Gratis)

1. **Push naar GitHub:**
```bash
git add .
git commit -m "Add booking system"
git push
```

2. **Ga naar:** [https://netlify.com](https://netlify.com)

3. **Klik:** "Add new site" → "Import an existing project"

4. **Selecteer:** Je GitHub repository

5. **Build settings** (automatisch gedetecteerd):
   - Build command: `npm run build`
   - Publish directory: `dist`

6. **Environment Variables toevoegen:**
   - Ga naar Site Settings → Environment Variables
   - Voeg toe:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

7. **Deploy!** 🎉

Je site is nu live op een Netlify URL!

## 🎨 Aanpassen

### Services Toevoegen/Bewerken

In Supabase:
1. Ga naar **Table Editor** → **services**
2. Klik **Insert row** of bewerk bestaande
3. Wijzigingen zijn direct zichtbaar!

### Openingstijden Aanpassen

In Supabase:
1. Ga naar **Table Editor** → **availability**
2. Bewerk de tijden
3. Voeg dagen toe/verwijder

### Admin Wachtwoord Wijzigen

In `src/pages/AdminDashboardPage.tsx`:
```typescript
// Regel 9: Verander naar je eigen wachtwoord
const ADMIN_PASSWORD = 'jouw-nieuwe-wachtwoord';
```

## 📞 Hulp Nodig?

### Veelvoorkomende Problemen

**"Services worden niet geladen"**
- ✅ Check of SQL schema is uitgevoerd
- ✅ Controleer `.env.local` waarden
- ✅ Restart development server

**"Can't connect to database"**
- ✅ Verifieer Supabase URL en API key
- ✅ Check of Supabase project actief is
- ✅ Kijk in browser console voor errors

**"Admin login werkt niet"**
- ✅ Wachtwoord is: `bariq2025` (let op hoofdletters)
- ✅ Clear browser cache
- ✅ Try incognito mode

### Check Documentatie

- 📖 **DATABASE_SETUP.md** - Volledige database uitleg
- 📖 **IMPLEMENTATION_GUIDE.md** - Complete features guide
- 📖 **BOOKING_SYSTEM_README.md** - Technische details

## ✨ Wat nu?

### Direct bruikbaar:
- ✅ Booking systeem live op `/booking-system`
- ✅ Admin dashboard op `/admin-dashboard`
- ✅ Real-time synchronisatie
- ✅ Email templates (log naar console)

### Volgende stappen:
1. **Email service configureren** (SendGrid/Resend)
2. **Admin wachtwoord aanpassen**
3. **Services personaliseren**
4. **Deploy naar productie**
5. **Custom domain instellen**

## 🎊 Success!

Je hebt nu een volledig werkend, professioneel booking systeem!

**Kosten: €0**
**Tijd: 5 minuten**
**Resultaat: Premium booking experience**

---

**Vragen?** Open een issue of check de volledige documentatie.

**Feedback?** Laat weten wat je ervan vindt!

Made with ❤️ for Bariq Auto Care 🚗✨
