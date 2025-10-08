# 📧 Email Setup Instructies voor Bariq Booking System

## Stap 1: Resend Account Aanmaken (GRATIS)

1. **Ga naar** [resend.com](https://resend.com)
2. **Klik op** "Start Building"
3. **Maak een account** aan met je email
4. **Verifieer** je email adres

✅ **Gratis plan:** 3,000 emails per maand, 100 emails per dag

---

## Stap 2: API Key Aanmaken

1. **Log in** op Resend Dashboard
2. **Ga naar** "API Keys" in het menu
3. **Klik op** "Create API Key"
4. **Naam:** "Bariq Booking System"
5. **Kopieer** de API key (bijv: `re_123abc...`)

⚠️ **BELANGRIJK:** Bewaar deze key veilig! Hij wordt maar 1x getoond.

---

## Stap 3: Domein Configureren (Optioneel maar Aanbevolen)

### Optie A: Gebruik Resend Test Domain (Direct werkend)
- Emails worden verzonden vanaf: `onboarding@resend.dev`
- ✅ Werkt direct, geen setup nodig
- ⚠️ Kan in spam terecht komen

### Optie B: Eigen Domein (Professioneel)
1. **Ga naar** "Domains" in Resend dashboard
2. **Klik op** "Add Domain"
3. **Voer in:** `bariqautocare.nl`
4. **Voeg DNS records toe** bij je domain provider:

```
Type: TXT
Name: resend._domainkey
Value: [Waarde van Resend dashboard]

Type: MX
Name: @
Value: feedback-smtp.eu-west-1.amazonses.com
Priority: 10
```

5. **Wacht** 24-48 uur voor DNS propagatie
6. **Verifieer** in Resend dashboard

---

## Stap 4: Environment Variabelen in Netlify

1. **Log in** op [Netlify](https://netlify.com)
2. **Ga naar** je Bariq site
3. **Klik op** "Site settings" → "Environment variables"
4. **Voeg toe:**

```
Key: RESEND_API_KEY
Value: re_jouw_api_key_hier
```

```
Key: ADMIN_EMAIL
Value: info@bariqautocare.nl  (of je eigen admin email)
```

5. **Deploy opnieuw** (Settings → Deploys → Trigger deploy → Deploy site)

---

## Stap 5: Netlify Functions Installeren

In je project directory:

```bash
cd netlify/functions
npm install
```

Dit installeert de `resend` package voor de Netlify Functions.

---

## Stap 6: Test het Systeem

1. **Ga naar** je booking pagina
2. **Maak een test booking**
3. **Check:**
   - ✅ Je ontvangt een klant email
   - ✅ Admin ontvangt een notificatie email
   
⚠️ **Let op:** Eerste email kan 1-2 minuten duren

---

## Email Configuratie Overzicht

### Klant Email bevat:
- ✅ Professioneel Bariq design (zwart/rood)
- ✅ Volledige booking details
- ✅ Datum, tijd, prijs
- ✅ Kenteken informatie
- ✅ Extra's lijst
- ✅ Contact informatie
- ✅ Belangrijke instructies

### Admin Email bevat:
- ✅ Duidelijke "NIEUWE BOOKING" alert
- ✅ Alle klantgegevens (klikbare tel/email links)
- ✅ Volledige booking details
- ✅ Totaal bedrag highlighted
- ✅ Directe actie buttons (bel/email klant)
- ✅ Tijdstempel van booking

---

## Troubleshooting

### Emails komen niet aan?

1. **Check Netlify logs:**
   - Ga naar Netlify Dashboard
   - Functions → Logs
   - Zoek naar errors

2. **Check Resend dashboard:**
   - Ga naar "Logs" in Resend
   - Zie of emails verzonden zijn
   - Check delivery status

3. **Check spam folder:**
   - Vooral bij test domain (@resend.dev)

4. **Verifieer environment variables:**
   ```bash
   # In Netlify dashboard
   Settings → Environment variables
   ```

### Veelvoorkomende Errors:

**"API key not found"**
- ✅ Fix: Voeg `RESEND_API_KEY` toe in Netlify environment variables

**"From address not verified"**
- ✅ Fix: Gebruik `onboarding@resend.dev` OF verifieer je eigen domein

**"Rate limit exceeded"**
- ✅ Fix: Je hebt het gratis limiet bereikt (100/dag)

---

## Productie Aanbevelingen

1. ✅ **Verifieer je eigen domein** voor betere deliverability
2. ✅ **Gebruik een dedicated email:** `bookings@bariqautocare.nl`
3. ✅ **Monitor email logs** regelmatig in Resend dashboard
4. ✅ **Test het systeem** elke week
5. ✅ **Backup admin email:** voeg meerdere admin emails toe indien nodig

---

## Kosten

- **Resend Gratis:** Tot 3,000 emails/maand
- **Na 3,000 emails:** $20/maand voor 50,000 emails
- **Gemiddeld gebruik:** ±100-200 bookings/maand = ~400 emails (ruim binnen gratis limiet)

---

## Support

**Resend Support:** [resend.com/support](https://resend.com/support)
**Documentatie:** [resend.com/docs](https://resend.com/docs)

---

✅ **Klaar! Je booking system stuurt nu automatisch professionele emails naar klanten én admin!**
