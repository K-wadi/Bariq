@echo off
echo Creating .env.local with your Supabase credentials...

(
echo VITE_SUPABASE_URL=https://mkbcygfabffxhyotlcgj.supabase.co
echo VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rYmN5Z2ZhYmZmeGh5b3RsY2dqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxNjUwNjYsImV4cCI6MjA2OTc0MTA2Nn0.sR15JcOiqwwUUt3CIOxQV4sFfFToYF_OUnc_LdwnEvE
echo VITE_ADMIN_PASSWORD=bariq2025
echo VITE_APP_NAME=Bariq Auto Care
echo VITE_APP_URL=http://localhost:5173
) > .env.local

echo.
echo ✅ .env.local created successfully!
echo.
echo Next steps:
echo 1. Run: npm run dev
echo 2. Open: http://localhost:5173/booking-system
echo 3. Test the booking system!
echo.
pause
