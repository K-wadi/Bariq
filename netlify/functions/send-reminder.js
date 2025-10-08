// Netlify Function voor het versturen van herinneringsemails
const { Resend } = require('resend');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { customerEmail, customerName, serviceName, startTime } = JSON.parse(event.body);

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

    const reminderEmailHtml = `
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
    .reminder-icon {
      font-size: 64px;
      text-align: center;
      margin: 20px 0;
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
    .highlight-box {
      background: linear-gradient(135deg, #E62323, #ff3434);
      padding: 20px;
      margin: 20px 0;
      border-radius: 8px;
      text-align: center;
    }
    .highlight-text {
      color: white;
      font-size: 20px;
      font-weight: bold;
      margin: 0;
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
    .footer {
      text-align: center;
      color: #666;
      font-size: 12px;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #333;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">BARIQ AUTOCARE</div>
      <p style="color: #9CA3AF; margin: 0;">Premium Auto Detailing</p>
    </div>
    
    <div class="reminder-icon">⏰</div>
    
    <h1 class="title">Herinnering: Je Afspraak Komt Eraan!</h1>
    
    <p class="message">
      Beste ${customerName},<br><br>
      Dit is een vriendelijke herinnering voor je aanstaande afspraak bij Bariq Autocare. We kijken ernaar uit om je auto weer te laten glanzen!
    </p>
    
    <div class="highlight-box">
      <p class="highlight-text">📅 Je afspraak is op ${formattedDate}</p>
      <p class="highlight-text">🕐 Om ${formattedTime}</p>
    </div>
    
    <div class="booking-details">
      <h3 style="color: #E62323; margin-top: 0;">📋 Afspraak Details</h3>
      
      <div class="detail-row">
        <span class="detail-label">Service</span>
        <span class="detail-value">${serviceName}</span>
      </div>
      
      <div class="detail-row">
        <span class="detail-label">📅 Datum</span>
        <span class="detail-value">${formattedDate}</span>
      </div>
      
      <div class="detail-row">
        <span class="detail-label">🕐 Tijd</span>
        <span class="detail-value">${formattedTime}</span>
      </div>
    </div>
    
    <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 5px; color: #856404;">
      <p style="margin: 0;"><strong>⚠️ Belangrijke Informatie:</strong></p>
      <p style="margin: 10px 0 0 0;">
        • Zorg dat je voertuig op tijd beschikbaar is<br>
        • Bij annulering, meld dit minimaal 24 uur van tevoren<br>
        • Neem je kentekenbewijs mee indien nodig
      </p>
    </div>
    
    <div class="contact-info">
      <p style="color: #FFFFFF; margin: 0 0 10px 0; font-weight: bold;">Vragen? Neem contact op:</p>
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

    const result = await resend.emails.send({
      from: 'Bariq Autocare <bookings@bariqautocare.nl>',
      to: customerEmail,
      subject: `⏰ Herinnering: Je afspraak op ${formattedDate}`,
      html: reminderEmailHtml,
    });

    console.log('Herinnering verzonden:', result);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Herinnering succesvol verzonden',
        emailId: result.data?.id
      })
    };

  } catch (error) {
    console.error('Reminder email error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};
