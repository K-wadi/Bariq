// Email service for sending booking confirmations, cancellations, and review requests using Mailgun
export interface BookingEmailData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  customerPostalCode: string;
  carBrand: string;
  carModel: string;
  licensePlate: string;
  packageType: 'basic' | 'premium';
  date: string;
  time: string;
  notes?: string;
  bookingId: string;
}

export interface CancellationEmailData {
  customerName: string;
  customerEmail: string;
  bookingId: string;
  date: string;
  time: string;
  carBrand: string;
  carModel: string;
  packageType: 'basic' | 'premium';
  reason?: string;
}

export interface ReviewRequestEmailData {
  customerName: string;
  customerEmail: string;
  bookingId: string;
  date: string;
  carBrand: string;
  carModel: string;
  packageType: 'basic' | 'premium';
}

export interface EmailLog {
  id: string;
  type: 'booking_confirmation' | 'admin_notification' | 'cancellation' | 'review_request';
  recipient: string;
  subject: string;
  status: 'sent' | 'failed';
  timestamp: Date;
  bookingId?: string;
  errorMessage?: string;
}

// Email logging functions
const EMAIL_LOGS_KEY = 'bariq_email_logs';

const saveEmailLog = (log: Omit<EmailLog, 'id' | 'timestamp'>): void => {
  try {
    const existingLogs = getEmailLogs();
    const newLog: EmailLog = {
      ...log,
      id: `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date()
    };
    
    const updatedLogs = [newLog, ...existingLogs].slice(0, 100); // Keep only last 100 logs
    localStorage.setItem(EMAIL_LOGS_KEY, JSON.stringify(updatedLogs));
  } catch (error) {
    console.error('Error saving email log:', error);
  }
};

export const getEmailLogs = (): EmailLog[] => {
  try {
    const logs = localStorage.getItem(EMAIL_LOGS_KEY);
    if (!logs) return [];
    
    const parsedLogs = JSON.parse(logs);
    // Convert timestamp strings back to Date objects
    return parsedLogs.map((log: any) => ({
      ...log,
      timestamp: new Date(log.timestamp)
    }));
  } catch (error) {
    console.error('Error retrieving email logs:', error);
    return [];
  }
};

export const clearEmailLogs = (): void => {
  try {
    localStorage.removeItem(EMAIL_LOGS_KEY);
  } catch (error) {
    console.error('Error clearing email logs:', error);
  }
};

// Check if we're in development mode
const isDevelopmentMode = (): boolean => {
  return window.location.hostname === 'localhost' || 
         window.location.hostname === '127.0.0.1' || 
         window.location.hostname.includes('bolt.new');
};

// 1. CONFIRMATION EMAIL TEMPLATE
export const getCustomerConfirmationEmailTemplate = (data: BookingEmailData): string => {
  const packageName = data.packageType === 'basic' ? 'Basic Clean' : 'Premium Clean';
  const packagePrice = data.packageType === 'basic' ? '€59' : '€119';
  
  return `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bevestiging van uw afspraak - Bariq Autocare</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #374151;
            background-color: #f9fafb;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(to right, #2BD5EC, #26BBEE, #119EF3, #1E87C5);
            padding: 30px 20px;
            text-align: center;
        }
        .logo {
            color: white;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .header-subtitle {
            color: rgba(255, 255, 255, 0.9);
            font-size: 16px;
            margin: 0;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 24px;
            font-weight: 600;
            color: #111827;
            margin-bottom: 20px;
        }
        .intro {
            font-size: 16px;
            margin-bottom: 30px;
            color: #4B5563;
        }
        .booking-details {
            background-color: #f3f4f6;
            border-radius: 8px;
            padding: 25px;
            margin: 30px 0;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .detail-label {
            font-weight: 600;
            color: #374151;
        }
        .detail-value {
            color: #6B7280;
            text-align: right;
        }
        .package-highlight {
            background: linear-gradient(to right, #2BD5EC, #119EF3);
            color: white;
            padding: 15px;
            border-radius: 6px;
            text-align: center;
            margin: 20px 0;
        }
        .package-name {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .package-price {
            font-size: 24px;
            font-weight: bold;
        }
        .what-to-expect {
            background-color: #ecfdf5;
            border-left: 4px solid #10b981;
            padding: 20px;
            margin: 30px 0;
        }
        .what-to-expect h3 {
            color: #065f46;
            margin-top: 0;
            margin-bottom: 15px;
        }
        .what-to-expect ul {
            margin: 0;
            padding-left: 20px;
            color: #047857;
        }
        .what-to-expect li {
            margin-bottom: 8px;
        }
        .contact-info {
            background-color: #fef3c7;
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
            text-align: center;
        }
        .contact-info h3 {
            color: #92400e;
            margin-top: 0;
            margin-bottom: 15px;
        }
        .contact-details {
            color: #b45309;
        }
        .footer {
            background-color: #1f2937;
            color: #d1d5db;
            padding: 30px;
            text-align: center;
        }
        .footer-logo {
            color: #2BD5EC;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 15px;
        }
        .footer-text {
            font-size: 14px;
            margin-bottom: 20px;
        }
        .social-links {
            margin-top: 20px;
        }
        .social-links a {
            color: #2BD5EC;
            text-decoration: none;
            margin: 0 10px;
        }
        @media (max-width: 600px) {
            .content {
                padding: 20px 15px;
            }
            .detail-row {
                flex-direction: column;
                align-items: flex-start;
            }
            .detail-value {
                text-align: left;
                margin-top: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">BARIQ AUTOCARE</div>
            <p class="header-subtitle">Premium Autowas Aan Huis</p>
        </div>
        
        <div class="content">
            <h1 class="greeting">Beste ${data.customerName},</h1>
            
            <p class="intro">
                Hartelijk dank voor uw vertrouwen in Bariq Autocare! We hebben uw afspraak
                succesvol ontvangen en bevestigen hierbij de details van uw boeking.
            </p>
            
            <div class="package-highlight">
                <div class="package-name">${packageName}</div>
                <div class="package-price">${packagePrice}</div>
            </div>
            
            <div class="booking-details">
                <div class="detail-row">
                    <span class="detail-label">Datum & Tijd:</span>
                    <span class="detail-value">${new Date(data.date).toLocaleDateString('nl-NL', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })} om ${data.time}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Voertuig:</span>
                    <span class="detail-value">${data.carBrand} ${data.carModel}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Kenteken:</span>
                    <span class="detail-value">${data.licensePlate}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Adres:</span>
                    <span class="detail-value">${data.customerAddress}<br>${data.customerPostalCode} ${data.customerCity}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Pakket:</span>
                    <span class="detail-value">${packageName}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Boekingsnummer:</span>
                    <span class="detail-value">#${data.bookingId}</span>
                </div>
                ${data.notes ? `
                <div class="detail-row">
                    <span class="detail-label">Opmerkingen:</span>
                    <span class="detail-value">${data.notes}</span>
                </div>
                ` : ''}
            </div>
            
            <div class="what-to-expect">
                <h3>Wat kunt u verwachten?</h3>
                <ul>
                    ${data.packageType === 'basic' ? `
                    <li>Grondige exterieur reiniging</li>
                    <li>Velgen en banden behandeling</li>
                    <li>Ramen kristalhelder</li>
                    <li>Droogdoeken van professionele kwaliteit</li>
                    ` : `
                    <li>Complete exterieur en interieur reiniging</li>
                    <li>Velgen en banden behandeling</li>
                    <li>Dashboard en interieur detailing</li>
                    <li>Ramen binnen en buiten kristalhelder</li>
                    <li>Stofzuigen van alle hoeken en gaten</li>
                    <li>Leder/stof behandeling</li>
                    `}
                </ul>
            </div>
            
            <div class="contact-info">
                <h3>Vragen of wijzigingen?</h3>
                <div class="contact-details">
                    <p><strong>Telefoon:</strong> 06 8552 3584</p>
                    <p><strong>Email:</strong> info@bariqautocare.nl</p>
                    <p><strong>WhatsApp:</strong> 06 8552 3584</p>
                </div>
            </div>
            
            <p>We kijken ernaar uit om uw auto weer te laten stralen!</p>
            
            <p>Met vriendelijke groet,<br>
            <strong>Het Bariq Autocare Team</strong></p>
        </div>
        
        <div class="footer">
            <div class="footer-logo">BARIQ AUTOCARE</div>
            <p class="footer-text">
                Premium autowas aan huis in heel Nederland<br>
                Professioneel • Betrouwbaar • Milieuvriendelijk
            </p>
            <div class="social-links">
                <a href="https://www.instagram.com/bariqautocare">Instagram</a>
                <a href="https://www.facebook.com/bariqautocare">Facebook</a>
                <a href="mailto:info@bariqautocare.nl">Email</a>
            </div>
        </div>
    </div>
</body>
</html>
`;
};

// 2. ADMIN NOTIFICATION EMAIL TEMPLATE
export const getAdminNotificationEmailTemplate = (data: BookingEmailData): string => {
  const packageName = data.packageType === 'basic' ? 'Basic Clean' : 'Premium Clean';
  
  return `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nieuwe Boeking - Bariq Autocare Admin</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #374151;
            background-color: #f9fafb;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(to right, #dc2626, #ef4444);
            padding: 30px 20px;
            text-align: center;
        }
        .logo {
            color: white;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .header-subtitle {
            color: rgba(255, 255, 255, 0.9);
            font-size: 16px;
            margin: 0;
        }
        .content {
            padding: 40px 30px;
        }
        .alert {
            background-color: #fef2f2;
            border-left: 4px solid #dc2626;
            padding: 20px;
            margin-bottom: 30px;
        }
        .alert h2 {
            color: #dc2626;
            margin-top: 0;
            margin-bottom: 10px;
        }
        .booking-details {
            background-color: #f3f4f6;
            border-radius: 8px;
            padding: 25px;
            margin: 30px 0;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        .detail-row:last-child {
            border-bottom: none;
        }
        .detail-label {
            font-weight: 600;
            color: #374151;
        }
        .detail-value {
            color: #6B7280;
            text-align: right;
        }
        .package-highlight {
            background: linear-gradient(to right, #2BD5EC, #119EF3);
            color: white;
            padding: 15px;
            border-radius: 6px;
            text-align: center;
            margin: 20px 0;
        }
        .actions {
            background-color: #ecfdf5;
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
            text-align: center;
        }
        .actions h3 {
            color: #065f46;
            margin-top: 0;
        }
        .footer {
            background-color: #1f2937;
            color: #d1d5db;
            padding: 30px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">BARIQ AUTOCARE</div>
            <p class="header-subtitle">Admin Notificatie</p>
        </div>
        
        <div class="content">
            <div class="alert">
                <h2>🚨 Nieuwe Boeking Ontvangen!</h2>
                <p>Er is zojuist een nieuwe boeking binnengekomen via de website.</p>
            </div>
            
            <div class="package-highlight">
                <div style="font-size: 18px; font-weight: bold; margin-bottom: 5px;">${packageName}</div>
            </div>
            
            <div class="booking-details">
                <div class="detail-row">
                    <span class="detail-label">Klant:</span>
                    <span class="detail-value">${data.customerName}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Email:</span>
                    <span class="detail-value">${data.customerEmail}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Telefoon:</span>
                    <span class="detail-value">${data.customerPhone}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Datum & Tijd:</span>
                    <span class="detail-value">${new Date(data.date).toLocaleDateString('nl-NL', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })} om ${data.time}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Adres:</span>
                    <span class="detail-value">${data.customerAddress}<br>${data.customerPostalCode} ${data.customerCity}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Voertuig:</span>
                    <span class="detail-value">${data.carBrand} ${data.carModel}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Kenteken:</span>
                    <span class="detail-value">${data.licensePlate}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Boekingsnummer:</span>
                    <span class="detail-value">#${data.bookingId}</span>
                </div>
                ${data.notes ? `
                <div class="detail-row">
                    <span class="detail-label">Opmerkingen:</span>
                    <span class="detail-value">${data.notes}</span>
                </div>
                ` : ''}
            </div>
            
            <div class="actions">
                <h3>Volgende Stappen:</h3>
                <p>
                    1. Controleer uw agenda voor ${new Date(data.date).toLocaleDateString('nl-NL')} om ${data.time}<br>
                    2. Bevestig de boeking telefonisch met de klant<br>
                    3. Voeg de afspraak toe aan uw planning<br>
                    4. Bereid de benodigde materialen voor
                </p>
            </div>
        </div>
        
        <div class="footer">
            <p>Bariq Autocare Admin Dashboard</p>
        </div>
    </div>
</body>
</html>
`;
};

// Core email sending function
const sendEmailViaNetlify = async (to: string, subject: string, html: string, text?: string): Promise<boolean> => {
  try {
    console.log('📧 Sending email via Netlify function:', { to, subject });
    
    const response = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject,
        html,
        text: text || `${subject}\n\nDeze email bevat HTML content. Bekijk de email in een HTML-compatible email client.`
      })
    });
    
    console.log('📤 Email API response status:', response.status);
    
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      
      try {
        const errorData = await response.json();
        console.error('📧 Email API error details:', errorData);
        errorMessage = errorData.error || errorData.details || errorMessage;
      } catch (parseError) {
        console.error('📧 Could not parse error response:', parseError);
        const textError = await response.text();
        console.error('📧 Raw error response:', textError);
        errorMessage += ` - Unable to parse error response`;
      }
      
      throw new Error(errorMessage);
    }
    
    const result = await response.json();
    console.log('✅ Email sent successfully:', result);
    
    return true;
  } catch (error) {
    console.error('💥 Error sending email:', error);
    throw error;
  }
};

// EMAIL SENDING FUNCTIONS
export const sendBookingConfirmationEmail = async (data: BookingEmailData): Promise<boolean> => {
  try {
    console.log('📧 Starting to send booking confirmation emails...');
    
    // Check if we're in development mode
    if (isDevelopmentMode()) {
      console.log('🔧 Development mode detected - simulating email send');
      console.log('📧 Would send customer email to:', data.customerEmail);
      console.log('📧 Would send admin email to: info@bariqautocare.nl');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Log the emails
      saveEmailLog({
        type: 'booking_confirmation',
        recipient: data.customerEmail,
        subject: `Bevestiging afspraak ${new Date(data.date).toLocaleDateString('nl-NL')} - Bariq Autocare`,
        status: 'sent',
        bookingId: data.bookingId
      });
      
      saveEmailLog({
        type: 'admin_notification',
        recipient: 'info@bariqautocare.nl',
        subject: `🚨 Nieuwe Boeking: ${new Date(data.date).toLocaleDateString('nl-NL')} om ${data.time} - ${data.customerName}`,
        status: 'sent',
        bookingId: data.bookingId
      });
      
      return true;
    }

    // Production email sending
    console.log('🚀 Production mode - sending actual emails');
    
    // Generate email templates
    const customerHtml = getCustomerConfirmationEmailTemplate(data);
    const adminHtml = getAdminNotificationEmailTemplate(data);
    
    // Send customer confirmation email
    console.log('📧 Sending customer confirmation email...');
    const customerSubject = `Bevestiging afspraak ${new Date(data.date).toLocaleDateString('nl-NL')} - Bariq Autocare`;
    await sendEmailViaNetlify(data.customerEmail, customerSubject, customerHtml);
    
    // Log customer email
    saveEmailLog({
      type: 'booking_confirmation',
      recipient: data.customerEmail,
      subject: customerSubject,
      status: 'sent',
      bookingId: data.bookingId
    });
    
    // Send admin notification email
    console.log('📧 Sending admin notification email...');
    const adminSubject = `🚨 Nieuwe Boeking: ${new Date(data.date).toLocaleDateString('nl-NL')} om ${data.time} - ${data.customerName}`;
    await sendEmailViaNetlify('info@bariqautocare.nl', adminSubject, adminHtml);
    
    // Log admin email
    saveEmailLog({
      type: 'admin_notification',
      recipient: 'info@bariqautocare.nl',
      subject: adminSubject,
      status: 'sent',
      bookingId: data.bookingId
    });
    
    console.log('✅ All booking confirmation emails sent successfully');
    return true;
    
  } catch (error) {
    console.error('💥 Error sending booking confirmation emails:', error);
    
    // Log error for both emails
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    saveEmailLog({
      type: 'booking_confirmation',
      recipient: data.customerEmail,
      subject: `Bevestiging afspraak ${new Date(data.date).toLocaleDateString('nl-NL')} - Bariq Autocare`,
      status: 'failed',
      bookingId: data.bookingId,
      errorMessage
    });
    
    saveEmailLog({
      type: 'admin_notification',
      recipient: 'info@bariqautocare.nl',
      subject: `🚨 Nieuwe Boeking: ${new Date(data.date).toLocaleDateString('nl-NL')} om ${data.time} - ${data.customerName}`,
      status: 'failed',
      bookingId: data.bookingId,
      errorMessage
    });
    
    return false;
  }
};

export const sendCancellationEmail = async (data: CancellationEmailData): Promise<boolean> => {
  try {
    console.log('📧 Sending cancellation email...');
    
    if (isDevelopmentMode()) {
      console.log('🔧 Development mode - simulating cancellation email');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      saveEmailLog({
        type: 'cancellation',
        recipient: data.customerEmail,
        subject: `Annulering afspraak ${new Date(data.date).toLocaleDateString('nl-NL')} - Bariq Autocare`,
        status: 'sent',
        bookingId: data.bookingId
      });
      
      return true;
    }

    // Production cancellation email
    const subject = `Annulering afspraak ${new Date(data.date).toLocaleDateString('nl-NL')} - Bariq Autocare`;
    const html = `
      <h2>Afspraak Geannuleerd</h2>
      <p>Beste ${data.customerName},</p>
      <p>Uw afspraak voor ${data.packageType === 'basic' ? 'Basic Clean' : 'Premium Clean'} op ${new Date(data.date).toLocaleDateString('nl-NL')} om ${data.time} is geannuleerd.</p>
      ${data.reason ? `<p><strong>Reden:</strong> ${data.reason}</p>` : ''}
      <p>Voor vragen kunt u contact opnemen via 06 8552 3584.</p>
      <p>Met vriendelijke groet,<br>Bariq Autocare</p>
    `;
    
    await sendEmailViaNetlify(data.customerEmail, subject, html);
    
    saveEmailLog({
      type: 'cancellation',
      recipient: data.customerEmail,
      subject,
      status: 'sent',
      bookingId: data.bookingId
    });
    
    return true;
  } catch (error) {
    console.error('Error sending cancellation email:', error);
    
    saveEmailLog({
      type: 'cancellation',
      recipient: data.customerEmail,
      subject: `Annulering afspraak ${new Date(data.date).toLocaleDateString('nl-NL')} - Bariq Autocare`,
      status: 'failed',
      bookingId: data.bookingId,
      errorMessage: error instanceof Error ? error.message : 'Unknown error'
    });
    
    return false;
  }
};

export const sendReviewRequestEmail = async (data: ReviewRequestEmailData): Promise<boolean> => {
  try {
    console.log('📧 Sending review request email...');
    
    if (isDevelopmentMode()) {
      console.log('🔧 Development mode - simulating review request email');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      saveEmailLog({
        type: 'review_request',
        recipient: data.customerEmail,
        subject: `Hoe was uw ervaring? - Bariq Autocare`,
        status: 'sent',
        bookingId: data.bookingId
      });
      
      return true;
    }

    // Production review request email
    const subject = `Hoe was uw ervaring? - Bariq Autocare`;
    const html = `
      <h2>Deel uw ervaring</h2>
      <p>Beste ${data.customerName},</p>
      <p>We hopen dat u tevreden bent met onze ${data.packageType === 'basic' ? 'Basic Clean' : 'Premium Clean'} service voor uw ${data.carBrand} ${data.carModel}.</p>
      <p>Zou u een moment willen nemen om uw ervaring te delen? Uw feedback helpt ons om onze service te verbeteren.</p>
      <p><a href="https://bariqautocare.nl/reviews" style="background: #2BD5EC; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Schrijf een review</a></p>
      <p>Met vriendelijke groet,<br>Bariq Autocare</p>
    `;
    
    await sendEmailViaNetlify(data.customerEmail, subject, html);
    
    saveEmailLog({
      type: 'review_request',
      recipient: data.customerEmail,
      subject,
      status: 'sent',
      bookingId: data.bookingId
    });
    
    return true;
  } catch (error) {
    console.error('Error sending review request email:', error);
    
    saveEmailLog({
      type: 'review_request',
      recipient: data.customerEmail,
      subject: `Hoe was uw ervaring? - Bariq Autocare`,
      status: 'failed',
      bookingId: data.bookingId,
      errorMessage: error instanceof Error ? error.message : 'Unknown error'
    });
    
    return false;
  }
};

// Test email function for development
export const testEmailConnection = async (): Promise<boolean> => {
  try {
    console.log('🧪 Testing email connection...');
    
    const testResult = await sendEmailViaNetlify(
      'test@example.com',
      'Test Email - Bariq Autocare',
      '<h1>Test Email</h1><p>This is a test email to verify the email service is working.</p>',
      'Test Email - This is a test email to verify the email service is working.'
    );
    
    console.log('✅ Email test completed successfully');
    return testResult;
  } catch (error) {
    console.error('❌ Email test failed:', error);
    return false;
  }
};