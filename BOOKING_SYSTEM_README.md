# 🚗 Bariq Premium Booking System

## ✨ Overzicht

Een volledig functioneel, modern booking systeem speciaal gebouwd voor Bariq Auto Care. Het systeem biedt een premium gebruikerservaring met real-time beschikbaarheid, automatische email notificaties, en een professioneel admin dashboard.

## 🎯 Features

### Voor Klanten
- ✅ **Moderne Service Selectie** - Kies uit verschillende detailing pakketten met prijzen en duur
- ✅ **Real-time Beschikbaarheid** - Zie direct welke tijdslots beschikbaar zijn
- ✅ **Intelligente Planning** - Automatische conflict detectie en slot blocking
- ✅ **Email Bevestiging** - Professionele bevestigingsemails na boeking
- ✅ **Mobile Responsive** - Perfect werkend op alle apparaten
- ✅ **Premium UI/UX** - Zwart/rood design met glassmorphism effecten

### Voor Admin
- ✅ **Dashboard met Statistieken** - Real-time overzicht van boekingen en omzet
- ✅ **Boekingen Beheer** - Bekijk, update en beheer alle boekingen
- ✅ **Status Updates** - Markeer boekingen als bevestigd, voltooid of geannuleerd
- ✅ **Email Herinneringen** - Verstuur herinneringen naar klanten
- ✅ **Real-time Sync** - Live updates via Supabase subscriptions
- ✅ **Filters & Zoeken** - Vind snel wat je zoekt

### Technisch
- ✅ **TypeScript** - Type-safe development
- ✅ **Supabase Database** - Gratis, schaalbaar en real-time
- ✅ **Netlify Functions** - Serverless email sending
- ✅ **Tailwind CSS** - Utility-first styling
- ✅ **React + Vite** - Snelle development en builds
- ✅ **100% Gratis** - Geen kosten voor hosting of database

## 📁 Project Structuur

```
Bariq/
├── src/
│   ├── components/
│   │   ├── BookingCalendar.tsx      # Main booking component
│   │   └── AdminDashboard.tsx       # Admin interface
│   ├── pages/
│   │   ├── BookingSystemPage.tsx    # Public booking page
│   │   └── AdminDashboardPage.tsx   # Protected admin page
│   ├── lib/
│   │   └── supabase.ts              # Database configuration
│   └── App.tsx                       # Routes
├── netlify/
│   └── functions/
│       ├── send-booking-confirmation.ts
│       └── send-reminder.ts
├── DATABASE_SETUP.md                 # Database setup guide
├── IMPLEMENTATION_GUIDE.md           # Complete implementation guide
└── ENV_SETUP.md                      # Environment variables guide
```

## 🚀 Quick Start

### 1. Database Setup (5 minuten)

```bash
# 1. Maak gratis Supabase account aan op https://supabase.com
# 2. Maak een nieuw project aan
# 3. Kopieer het SQL schema uit DATABASE_SETUP.md
# 4. Voer het uit in de Supabase SQL Editor
```

### 2. Environment Variables

Maak een `.env.local` bestand:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_ADMIN_PASSWORD=bariq2025
```

### 3. Start Development

```bash
npm install
npm run dev
```

### 4. Test het Systeem

**Booking:**
- Open `http://localhost:5173/booking-system`
- Maak een test boeking

**Admin:**
- Open `http://localhost:5173/admin-dashboard`
- Login met: `bariq2025`

## 🎨 Design System

### Kleuren

```css
/* Primary Colors */
--red-primary: #dc2626
--black: #000000
--gray-dark: #1f1f1f

/* Backgrounds */
background: linear-gradient(to bottom right, #000, #1a1a1a, #000)

/* Cards */
background: rgba(31, 31, 31, 0.8)
border: 1px solid rgba(220, 38, 38, 0.2)
backdrop-filter: blur(12px)
```

### Typography

```css
/* Headings */
font-family: 'Poppins', sans-serif

/* Body */
font-family: 'Inter', sans-serif
```

## 📱 Routes

| URL | Component | Beschrijving | Toegang |
|-----|-----------|--------------|---------|
| `/booking-system` | BookingSystemPage | Public booking interface | Public |
| `/admin-dashboard` | AdminDashboardPage | Admin dashboard | Password |
| `/booking-system` | BookingPage (legacy) | Calendly integration | Public |
| `/admin` | AdminPage (legacy) | Old admin | Password |

## 🗄️ Database Schema

### Services Table
```sql
- id (UUID)
- name (VARCHAR)
- description (TEXT)
- duration (INT) -- in minutes
- price (DECIMAL)
- color (VARCHAR)
- active (BOOLEAN)
```

### Bookings Table
```sql
- id (UUID)
- service_id (UUID)
- customer_name (VARCHAR)
- customer_email (VARCHAR)
- customer_phone (VARCHAR)
- start_time (TIMESTAMP)
- end_time (TIMESTAMP)
- status (VARCHAR) -- confirmed/cancelled/completed
- notes (TEXT)
```

## 🔐 Security

### Row Level Security (RLS)

Alle tabellen hebben RLS policies:
- Public kan services lezen
- Public kan bookings aanmaken
- Alleen geverifieerde users kunnen updaten/deleten

### Admin Authentication

Simple password protection in development:
```typescript
const ADMIN_PASSWORD = 'bariq2025';
```

Voor productie: Implementeer Supabase Auth of Auth0.

## 📧 Email Integration

### Development
Emails worden gelogd naar console voor debugging.

### Production
Integreer met een email service:

**Optie 1: SendGrid**
```bash
npm install @sendgrid/mail
```

**Optie 2: Resend (Aanbevolen)**
```bash
npm install resend
```

Update de Netlify functions met je API credentials.

## 🌐 Deployment

### Netlify (Aanbevolen)

```bash
# 1. Push naar Git
git add .
git commit -m "Add booking system"
git push

# 2. Connect in Netlify Dashboard
# 3. Voeg environment variables toe
# 4. Deploy!
```

### Environment Variables in Netlify

```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxx
VITE_ADMIN_PASSWORD=xxx
```

## 📊 Features Roadmap

### ✅ Voltooid
- [x] Service selectie
- [x] Real-time beschikbaarheid
- [x] Booking formulier
- [x] Admin dashboard
- [x] Email templates
- [x] Status management
- [x] Responsive design

### 🚧 Toekomstig
- [ ] SMS notificaties (Twilio)
- [ ] WhatsApp integratie
- [ ] Online betaling (Mollie/Stripe)
- [ ] Google Calendar sync
- [ ] Customer portal
- [ ] Loyalty programma
- [ ] Review systeem
- [ ] Multi-language support

## 💰 Kosten

**100% GRATIS Setup:**
- ✅ Supabase Free Tier: 500 MB database, 50K monthly active users
- ✅ Netlify Free Tier: 100 GB bandwidth, 300 build minutes
- ✅ Geen creditcard vereist
- ✅ Perfect voor 1000+ bookings per maand

**Wanneer upgraden?**
- Database > 500 MB (~50,000 boekingen)
- Traffic > 100 GB/maand
- Real-time gebruikers > 500 concurrent

## 🐛 Troubleshooting

### "Can't connect to database"
```bash
# Check environment variables
echo $VITE_SUPABASE_URL

# Restart dev server
npm run dev
```

### "Services niet geladen"
- Controleer of SQL schema is uitgevoerd
- Verifieer RLS policies in Supabase
- Check browser console voor errors

### "Admin login werkt niet"
- Wachtwoord is: `bariq2025` (case-sensitive)
- Clear browser cache
- Check src/pages/AdminDashboardPage.tsx

## 📚 Documentatie

Volledige guides beschikbaar:
- **[DATABASE_SETUP.md](./DATABASE_SETUP.md)** - Complete database setup
- **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)** - Implementatie handleiding
- **[ENV_SETUP.md](./ENV_SETUP.md)** - Environment variables

## 🎯 Performance

### Lighthouse Scores (Target)
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

### Optimizations
- ✅ Database indexes
- ✅ Real-time subscriptions
- ✅ Image lazy loading
- ✅ Code splitting (Vite)
- ✅ Tailwind purging

## 🤝 Support

Voor vragen of issues:
1. Check de documentatie
2. Inspect browser console
3. Review Supabase logs
4. Test in incognito mode

## 📝 License

Dit booking systeem is custom gebouwd voor Bariq Auto Care.

## 🎉 Credits

**Built with:**
- React + TypeScript
- Vite
- Tailwind CSS
- Supabase
- Netlify Functions
- Framer Motion
- Lucide Icons

---

**Made with ❤️ for Bariq Auto Care**

Van concept naar volledig werkend systeem in één implementatie.

*Premium booking, premium service, premium results.* 🚗✨
