# 🔐 Supabase Credentials - Bariq Auto Care

## ⚠️ BELANGRIJK - BEWAAR DIT VEILIG!

Dit bestand bevat gevoelige informatie. Verwijder dit bestand na setup of bewaar het op een veilige plek.

## Je Supabase Project

**Project ID:** `mkbcygfabffxhyotlcgj`
**Project URL:** `https://mkbcygfabffxhyotlcgj.supabase.co`
**Region:** EU Central (Frankfurt)

## Database Connection Strings

Je hebt 3 connection strings (gebruik in verschillende scenario's):

### 1. Direct Connection (Supabase Studio/Admin)
```
postgresql://postgres:K_oko_2003.nl@db.mkbcygfabffxhyotlcgj.supabase.co:5432/postgres
```

### 2. Transaction Pooler (Aanbevolen voor serverless)
```
postgresql://postgres.mkbcygfabffxhyotlcgj:K_oko_2003.nl@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
```

### 3. Session Pooler (Voor langlopende connections)
```
postgresql://postgres.mkbcygfabffxhyotlcgj:K_oko_2003.nl@aws-0-eu-central-1.pooler.supabase.com:5432/postgres
```

## Wat je nu moet doen:

### Stap 1: Haal je Anon Key op

1. Ga naar: https://supabase.com/dashboard/project/mkbcygfabffxhyotlcgj
2. Klik op **Settings** (tandwiel icoon links onderaan)
3. Klik op **API**
4. Kopieer de **anon public key**

### Stap 2: Update .env.local

Open `.env.local` en vervang `YOUR_ANON_KEY_HERE` met je echte anon key.

### Stap 3: Voer SQL Schema uit

1. Ga naar: https://supabase.com/dashboard/project/mkbcygfabffxhyotlcgj/sql
2. Klik op **New Query**
3. Kopieer het volledige SQL schema uit `DATABASE_SETUP.md`
4. Plak in de editor
5. Klik op **Run**

### Stap 4: Verifieer Database

Check of deze tabellen zijn aangemaakt:
- ✅ services
- ✅ bookings
- ✅ availability
- ✅ settings

### Stap 5: Test je Applicatie

```bash
npm run dev
```

Ga naar:
- **Booking:** http://localhost:5173/booking-system
- **Admin:** http://localhost:5173/admin-dashboard

## Security Checklist

- [ ] `.env.local` staat in `.gitignore` ✅ (al geconfigureerd)
- [ ] Dit bestand wordt NIET gecommit naar Git
- [ ] Anon key is toegevoegd aan `.env.local`
- [ ] SQL schema is uitgevoerd
- [ ] Test booking werkt
- [ ] Admin dashboard is toegankelijk

## Voor Productie (Netlify)

Voeg deze environment variables toe in Netlify:

1. Ga naar: Netlify Dashboard → Site Settings → Environment Variables
2. Voeg toe:
   - `VITE_SUPABASE_URL` = `https://mkbcygfabffxhyotlcgj.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = (je anon public key)
   - `VITE_ADMIN_PASSWORD` = (nieuw wachtwoord voor admin)

## Database Wachtwoord Wijzigen (Optioneel)

Als je het database wachtwoord wilt wijzigen:

1. Ga naar: https://supabase.com/dashboard/project/mkbcygfabffxhyotlcgj/settings/database
2. Klik op **Reset Database Password**
3. Kies een nieuw sterk wachtwoord
4. ⚠️ Let op: Dit zal alle bestaande connections verbreken

## Troubleshooting

### "Invalid API Key"
- Controleer of je de **anon public** key gebruikt (niet de service_role key)
- Verifieer dat `.env.local` correct is ingevuld
- Restart development server: `npm run dev`

### "Connection Failed"
- Check of je Supabase project actief is
- Verifieer de project URL
- Test in browser: https://mkbcygfabffxhyotlcgj.supabase.co (zou een Supabase pagina moeten tonen)

### "Table does not exist"
- SQL schema is waarschijnlijk niet uitgevoerd
- Ga naar SQL Editor en voer `DATABASE_SETUP.md` schema uit
- Check in Table Editor of tabellen bestaan

## Support Links

- **Dashboard:** https://supabase.com/dashboard/project/mkbcygfabffxhyotlcgj
- **SQL Editor:** https://supabase.com/dashboard/project/mkbcygfabffxhyotlcgj/sql
- **Table Editor:** https://supabase.com/dashboard/project/mkbcygfabffxhyotlcgj/editor
- **API Settings:** https://supabase.com/dashboard/project/mkbcygfabffxhyotlcgj/settings/api
- **Database Settings:** https://supabase.com/dashboard/project/mkbcygfabffxhyotlcgj/settings/database

## ⚠️ Security Warning

**VERWIJDER OF BEVEILIG DIT BESTAND!**

Dit bestand bevat je database wachtwoord. Na setup:
1. Bewaar op veilige plek (password manager)
2. Verwijder uit je project
3. Of voeg toe aan `.gitignore`

---

**Ready to build something amazing! 🚀**
