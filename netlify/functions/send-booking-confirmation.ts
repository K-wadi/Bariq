import type { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { customerEmail, customerName, serviceName, startTime, duration, price } = JSON.parse(event.body || '{}');

    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            font-family: 'Helvetica Neue', Arial, sans-serif; 
            background: #000; 
            color: #fff; 
            margin: 0;
            padding: 0;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
          }
          .header { 
            text-align: center; 
            border-bottom: 3px solid #dc2626; 
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 32px;
            font-weight: bold;
            background: linear-gradient(to right, #fff, #dc2626);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .content { 
            padding: 20px 0; 
          }
          .booking-details { 
            background: #1a1a1a; 
            padding: 25px; 
            border-radius: 12px; 
            border-left: 4px solid #dc2626;
            margin: 20px 0;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid #333;
          }
          .detail-row:last-child {
            border-bottom: none;
            padding-top: 20px;
            margin-top: 10px;
            border-top: 2px solid #dc2626;
          }
          .detail-label {
            color: #999;
            font-size: 14px;
          }
          .detail-value {
            font-weight: bold;
            color: #fff;
          }
          .price {
            font-size: 24px;
            color: #dc2626;
          }
          .footer { 
            text-align: center; 
            color: #666; 
            font-size: 12px;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #333;
          }
          .button {
            display: inline-block;
            background: linear-gradient(to right, #dc2626, #b91c1c);
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: bold;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">BARIQ AUTO CARE</div>
            <h2 style="color: #dc2626; margin-top: 10px;">Booking Bevestiging</h2>
          </div>
          <div class="content">
            <p style="font-size: 16px;">Beste ${customerName},</p>
            <p style="color: #ccc;">
              Je boeking is succesvol bevestigd! We kijken ernaar uit om jouw voertuig de premium behandeling te geven die het verdient.
            </p>
            
            <div class="booking-details">
              <h3 style="margin-top: 0; color: #dc2626;">Booking Details</h3>
              <div class="detail-row">
                <span class="detail-label">Service</span>
                <span class="detail-value">${serviceName}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Datum & Tijd</span>
                <span class="detail-value">${new Date(startTime).toLocaleString('nl-NL', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Duur</span>
                <span class="detail-value">${duration} minuten</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Prijs</span>
                <span class="detail-value price">€${price}</span>
              </div>
            </div>
            
            <p style="color: #ccc;">
              <strong>Belangrijke informatie:</strong><br>
              • Zorg dat je voertuig op tijd aanwezig is<br>
              • Verwijder persoonlijke waardevolle spullen uit je auto<br>
              • Bij vragen of wijzigingen, neem contact met ons op
            </p>

            <div style="text-align: center;">
              <a href="https://bariqautocare.nl/contact" class="button">Contact Opnemen</a>
            </div>

            <p style="color: #999; font-size: 14px; margin-top: 30px;">
              Bedankt voor het kiezen van Bariq Auto Care - waar kwaliteit en perfectie samenkomen.
            </p>
          </div>
          <div class="footer">
            <p><strong>Bariq Auto Care</strong></p>
            <p>Premium Car Detailing & Ceramic Coating</p>
            <p>Email: info@bariqautocare.nl | Website: www.bariqautocare.nl</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Log voor debugging (in productie zou je hier een echte email service gebruiken)
    console.log('=== Booking Confirmation Email ===');
    console.log('To:', customerEmail);
    console.log('Customer:', customerName);
    console.log('Service:', serviceName);
    console.log('Time:', startTime);
    console.log('Duration:', duration, 'minutes');
    console.log('Price: €', price);
    console.log('==================================');

    // TODO: Integreer met een echte email service zoals:
    // - SendGrid
    // - Mailgun
    // - AWS SES
    // - Resend
    // 
    // Voorbeeld met SendGrid:
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // await sgMail.send({
    //   to: customerEmail,
    //   from: 'noreply@bariqautocare.nl',
    //   subject: 'Booking Bevestiging - Bariq Auto Care',
    //   html: emailContent
    // });

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Email sent successfully',
        debug: 'Email logged to console (configure email service for production)'
      })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' })
    };
  }
};
