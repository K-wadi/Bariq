# Environment Variables Setup

Maak een `.env.local` bestand in de root van je project met de volgende inhoud:

```env
# Supabase Configuration
# Haal deze waarden op uit je Supabase project dashboard
# Settings → API
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Admin Configuration
VITE_ADMIN_PASSWORD=bariq2025

# Application
VITE_APP_NAME=Bariq Auto Care
VITE_APP_URL=http://localhost:5173
```

## Voor Productie (Netlify)

Voeg deze environment variables toe in Netlify:
1. Ga naar je site dashboard
2. **Site Settings** → **Environment Variables**
3. Voeg alle bovenstaande variabelen toe (zonder `VITE_APP_URL` of met je production URL)

## Voor Productie (Vercel)

1. Ga naar je project dashboard
2. **Settings** → **Environment Variables**
3. Voeg alle variabelen toe

**Let op:** Zet `.env.local` in je `.gitignore` om je credentials veilig te houden!
