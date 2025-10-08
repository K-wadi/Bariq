// Netlify Function voor het versturen van booking emails naar klant EN admin
const { Resend } = require('resend');

exports.handler = async (event) => {
  // Alleen POST requests toestaan
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    const {
      customerName,
      customerEmail,
      customerPhone,
      licensePlate,
      serviceName,
      vehicleClass,
      addons,
      startTime,
      totalPrice,
      duration
    } = data;

    // Initialize Resend met je API key
    const resend = new Resend(process.env.RESEND_API_KEY);

    const bookingDate = new Date(startTime);
    const formattedDate = bookingDate.toLocaleDateString('nl-NL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const formattedTime = bookingDate.toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit'
    });

    // Email naar KLANT
    const customerEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #0B0B0B;
      color: #FFFFFF;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #121212;
      padding: 40px 20px;
    }
    .header {
      text-align: center;
      padding-bottom: 30px;
      border-bottom: 2px solid #E62323;
    }
    .logo {
      font-size: 32px;
      font-weight: bold;
      color: #E62323;
      margin-bottom: 10px;
    }
    .title {
      font-size: 28px;
      font-weight: bold;
      color: #FFFFFF;
      margin: 30px 0 20px 0;
    }
    .message {
      font-size: 16px;
      color: #9CA3AF;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    .booking-details {
      background-color: #0B0B0B;
      border-left: 4px solid #E62323;
      padding: 20px;
      margin: 30px 0;
      border-radius: 8px;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #333;
    }
    .detail-row:last-child {
      border-bottom: none;
    }
    .detail-label {
      color: #9CA3AF;
      font-weight: 500;
    }
    .detail-value {
      color: #FFFFFF;
      font-weight: 600;
      text-align: right;
    }
    .addon-item {
      color: #D1D5DB;
      font-size: 14px;
      padding: 5px 0;
      padding-left: 15px;
    }
    .total-row {
      background-color: #E62323;
      padding: 15px 20px;
      margin-top: 20px;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .total-label {
      font-size: 18px;
      font-weight: bold;
      color: #FFFFFF;
    }
    .total-value {
      font-size: 32px;
      font-weight: bold;
      color: #FFFFFF;
    }
    .info-box {
      background-color: #1a1a1a;
      border: 1px solid #333;
      padding: 20px;
      margin: 30px 0;
      border-radius: 8px;
    }
    .info-title {
      color: #E62323;
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 10px;
    }
    .info-text {
      color: #9CA3AF;
      font-size: 14px;
      line-height: 1.6;
    }
    .footer {
      text-align: center;
      color: #666;
      font-size: 12px;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #333;
    }
    .contact-info {
      margin-top: 20px;
      padding: 15px;
      background-color: #1a1a1a;
      border-radius: 8px;
    }
    .contact-link {
      color: #E62323;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">BARIQ AUTOCARE</div>
      <p style="color: #9CA3AF; margin: 0;">Premium Auto Detailing</p>
    </div>
    
    <h1 class="title">✅ Booking Bevestigd!</h1>
    
    <p class="message">
      Beste ${customerName},<br><br>
      Bedankt voor je boeking bij Bariq Autocare! We hebben je afspraak succesvol ontvangen en kijken ernaar uit om je auto de premium behandeling te geven die hij verdient.
    </p>
    
    <div class="booking-details">
      <h3 style="color: #E62323; margin-top: 0;">📋 Jouw Booking Details</h3>
      
      <div class="detail-row">
        <span class="detail-label">Service</span>
        <span class="detail-value">${serviceName}</span>
      </div>
      
      ${addons && addons.length > 0 ? `
      <div class="detail-row">
        <span class="detail-label">Extra's (${addons.length})</span>
        <span class="detail-value"></span>
      </div>
      ${addons.map(addon => `
        <div class="addon-item">• ${addon.name} - €${addon.price}</div>
      `).join('')}
      ` : ''}
      
      <div class="detail-row">
        <span class="detail-label">📅 Datum</span>
        <span class="detail-value">${formattedDate}</span>
      </div>
      
      <div class="detail-row">
        <span class="detail-label">🕐 Tijd</span>
        <span class="detail-value">${formattedTime}</span>
      </div>
      
      <div class="detail-row">
        <span class="detail-label">⏱️ Duur</span>
        <span class="detail-value">±${duration} minuten</span>
      </div>
      
      ${licensePlate ? `
      <div class="detail-row">
        <span class="detail-label">🚗 Kenteken</span>
        <span class="detail-value">${licensePlate}</span>
      </div>
      ` : ''}
    </div>
    
    <div class="total-row">
      <span class="total-label">Totaal Bedrag</span>
      <span class="total-value">€${totalPrice}</span>
    </div>
    
    <div class="info-box">
      <div class="info-title">📍 Belangrijk!</div>
      <div class="info-text">
        • Zorg dat je voertuig op tijd beschikbaar is<br>
        • We nemen contact op als er wijzigingen zijn<br>
        • Bij annulering, meld dit minimaal 24 uur van tevoren<br>
        • Betaling kan contant of via pin na de service
      </div>
    </div>
    
    <div class="contact-info">
      <p style="color: #9CA3AF; margin: 5px 0;">
        📞 <a href="tel:0685523584" class="contact-link">06 8552 3584</a>
      </p>
      <p style="color: #9CA3AF; margin: 5px 0;">
        ✉️ <a href="mailto:info@bariqautocare.nl" class="contact-link">info@bariqautocare.nl</a>
      </p>
    </div>
    
    <div class="footer">
      <p>Bariq Autocare - Premium Car Detailing</p>
      <p>© ${new Date().getFullYear()} Bariq Autocare. Alle rechten voorbehouden.</p>
    </div>
  </div>
</body>
</html>
    `;

    // Email naar ADMIN
    const adminEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border: 2px solid #E62323;
      border-radius: 10px;
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #E62323, #ff3434);
      color: white;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
    }
    .content {
      padding: 30px;
    }
    .alert-box {
      background-color: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 15px;
      margin-bottom: 20px;
      border-radius: 5px;
    }
    .detail-section {
      background-color: #f8f9fa;
      padding: 20px;
      margin: 15px 0;
      border-radius: 8px;
      border: 1px solid #dee2e6;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #dee2e6;
    }
    .detail-row:last-child {
      border-bottom: none;
    }
    .label {
      font-weight: 600;
      color: #495057;
    }
    .value {
      color: #212529;
      text-align: right;
    }
    .customer-info {
      background-color: #e7f3ff;
      border-left: 4px solid #0066cc;
      padding: 15px;
      margin: 15px 0;
      border-radius: 5px;
    }
    .total-highlight {
      background: linear-gradient(135deg, #E62323, #ff3434);
      color: white;
      padding: 20px;
      margin: 20px 0;
      border-radius: 8px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
    }
    .action-buttons {
      text-align: center;
      margin: 30px 0;
    }
    .button {
      display: inline-block;
      padding: 12px 30px;
      margin: 5px;
      background-color: #E62323;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔔 NIEUWE BOOKING!</h1>
      <p style="margin: 5px 0;">Bariq Autocare Admin Notificatie</p>
    </div>
    
    <div class="content">
      <div class="alert-box">
        <strong>⚡ Actie Vereist:</strong> Er is zojuist een nieuwe booking binnengekomen die bevestiging nodig heeft.
      </div>
      
      <div class="customer-info">
        <h3 style="margin-top: 0; color: #0066cc;">👤 Klantgegevens</h3>
        <p><strong>Naam:</strong> ${customerName}</p>
        <p><strong>Email:</strong> <a href="mailto:${customerEmail}">${customerEmail}</a></p>
        <p><strong>Telefoon:</strong> <a href="tel:${customerPhone}">${customerPhone || 'Niet opgegeven'}</a></p>
        ${licensePlate ? `<p><strong>Kenteken:</strong> ${licensePlate}</p>` : ''}
      </div>
      
      <div class="detail-section">
        <h3 style="margin-top: 0; color: #E62323;">📋 Booking Details</h3>
        
        <div class="detail-row">
          <span class="label">Service</span>
          <span class="value">${serviceName}</span>
        </div>
        
        <div class="detail-row">
          <span class="label">Voertuigklasse</span>
          <span class="value">${vehicleClass === 'klein' ? 'Klasse A (Klein)' : 'Klasse B (Groot)'}</span>
        </div>
        
        ${addons && addons.length > 0 ? `
        <div class="detail-row">
          <span class="label">Extra's (${addons.length})</span>
          <span class="value"></span>
        </div>
        ${addons.map(addon => `
          <div style="padding: 5px 0 5px 20px; color: #666;">
            • ${addon.name} - €${addon.price}
          </div>
        `).join('')}
        ` : ''}
        
        <div class="detail-row">
          <span class="label">📅 Datum</span>
          <span class="value">${formattedDate}</span>
        </div>
        
        <div class="detail-row">
          <span class="label">🕐 Tijd</span>
          <span class="value">${formattedTime}</span>
        </div>
        
        <div class="detail-row">
          <span class="label">⏱️ Geschatte Duur</span>
          <span class="value">${duration} minuten</span>
        </div>
      </div>
      
      <div class="total-highlight">
        💰 Totaal: €${totalPrice}
      </div>
      
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 5px 0; color: #666;"><strong>Booking Tijdstip:</strong> ${new Date().toLocaleString('nl-NL')}</p>
        <p style="margin: 5px 0; color: #666;"><strong>Status:</strong> <span style="color: #28a745; font-weight: bold;">✅ BEVESTIGD</span></p>
      </div>
      
      <div class="action-buttons">
        <a href="mailto:${customerEmail}" class="button">📧 Contact Klant</a>
        <a href="tel:${customerPhone}" class="button">📞 Bel Klant</a>
      </div>
      
      <div style="text-align: center; color: #999; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
        <p>Bariq Autocare Admin Dashboard</p>
        <p>Deze email is automatisch gegenereerd</p>
      </div>
    </div>
  </div>
</body>
</html>
    `;

    // Verstuur beide emails
    const results = await Promise.all([
      // Email naar klant
      resend.emails.send({
        from: 'Bariq Autocare <bookings@bariqautocare.nl>',
        to: customerEmail,
        subject: `✅ Booking Bevestiging - ${formattedDate} om ${formattedTime}`,
        html: customerEmailHtml,
      }),
      
      // Email naar admin
      resend.emails.send({
        from: 'Bariq Booking System <bookings@bariqautocare.nl>',
        to: process.env.ADMIN_EMAIL || 'admin@bariqautocare.nl',
        subject: `🔔 NIEUWE BOOKING: ${customerName} - ${formattedDate}`,
        html: adminEmailHtml,
      })
    ]);

    console.log('Emails verzonden:', results);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Emails succesvol verzonden naar klant en admin',
        emailIds: results.map(r => r.data?.id)
      })
    };

  } catch (error) {
    console.error('Email send error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message,
        details: 'Kon emails niet versturen. Check de logs.'
      })
    };
  }
};
