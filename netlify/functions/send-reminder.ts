import type { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { customerEmail, customerName, serviceName, startTime } = JSON.parse(event.body || '{}');

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
          .reminder-box {
            background: #1a1a1a;
            border: 2px solid #dc2626;
            border-radius: 12px;
            padding: 25px;
            margin: 20px 0;
            text-align: center;
          }
          .time-display {
            font-size: 28px;
            color: #dc2626;
            font-weight: bold;
            margin: 15px 0;
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
            <div class="logo">BARIQ AUTO CARE</div>
            <h2 style="color: #dc2626; margin-top: 10px;">⏰ Afspraak Herinnering</h2>
          </div>
          <div class="content">
            <p style="font-size: 16px;">Beste ${customerName},</p>
            <p style="color: #ccc;">
              Dit is een vriendelijke herinnering voor je aanstaande afspraak bij Bariq Auto Care.
            </p>
            
            <div class="reminder-box">
              <h3 style="color: #fff; margin-top: 0;">Je Afspraak</h3>
              <p style="color: #999; margin: 5px 0;">${serviceName}</p>
              <div class="time-display">
                ${new Date(startTime).toLocaleDateString('nl-NL', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div style="font-size: 24px; color: #fff; font-weight: bold;">
                ${new Date(startTime).toLocaleTimeString('nl-NL', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
            
            <p style="color: #ccc;">
              <strong>Checklist:</strong><br>
              ✓ Zorg dat je op tijd bent<br>
              ✓ Verwijder waardevolle spullen uit je auto<br>
              ✓ Bij verhindering, geef dit tijdig door
            </p>

            <p style="color: #999; font-size: 14px; margin-top: 30px;">
              We zien je graag! Voor vragen kun je contact opnemen via info@bariqautocare.nl
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

    console.log('=== Reminder Email ===');
    console.log('To:', customerEmail);
    console.log('Customer:', customerName);
    console.log('Service:', serviceName);
    console.log('Time:', startTime);
    console.log('=====================');

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Reminder sent successfully',
        debug: 'Email logged to console (configure email service for production)'
      })
    };
  } catch (error) {
    console.error('Error sending reminder:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send reminder' })
    };
  }
};
