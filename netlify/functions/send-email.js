const formData = require('form-data');
const Mailgun = require('mailgun.js');

exports.handler = async (event, context) => {
  console.log('📧 Netlify function called: send-email');
  console.log('🔍 HTTP Method:', event.httpMethod);
  console.log('🌐 Headers:', JSON.stringify(event.headers, null, 2));
  
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ message: 'CORS preflight successful' })
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    console.log('❌ Method not allowed:', event.httpMethod);
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ error: 'Method not allowed. Use POST.' })
    };
  }

  try {
    console.log('📦 Raw body:', event.body);
    
    // Parse the request body
    let requestData;
    try {
      requestData = JSON.parse(event.body);
      console.log('✅ Successfully parsed request body');
    } catch (parseError) {
      console.log('❌ Failed to parse request body:', parseError.message);
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        body: JSON.stringify({ 
          error: 'Invalid JSON in request body',
          details: parseError.message 
        })
      };
    }

    const { to, subject, html, text, attachment } = requestData;
    console.log('📧 Email details:', { 
      to, 
      subject, 
      htmlLength: html?.length, 
      textLength: text?.length,
      hasAttachment: !!attachment
    });

    // Validate required fields
    if (!to || !subject || !html) {
      console.log('❌ Missing required fields');
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        body: JSON.stringify({ 
          error: 'Missing required fields: to, subject, html',
          received: { to: !!to, subject: !!subject, html: !!html }
        })
      };
    }

    // Use correct Mailgun credentials
    const mailgunApiKey = 'a9935109a99fe459921450cce0b3fede-5bb33252-291c3a90';
    const mailgunDomain = 'bariqautocare.nl';
    const fromEmail = 'Bariq Autocare <noreply@bariqautocare.nl>';

    console.log('🔑 Using Mailgun credentials:', {
      hasApiKey: !!mailgunApiKey,
      domain: mailgunDomain,
      fromEmail: fromEmail
    });

    if (!mailgunApiKey) {
      console.log('❌ Missing MAILGUN_API_KEY');
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        body: JSON.stringify({ 
          error: 'Server configuration error: Missing MAILGUN_API_KEY',
          details: 'The email service is not properly configured. Please contact the administrator.'
        })
      };
    }

    // Initialize Mailgun
    console.log('🚀 Initializing Mailgun...');
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
      username: 'api',
      key: mailgunApiKey,
      url: 'https://api.eu.mailgun.net' // EU endpoint
    });

    // Prepare email data
    const emailData = {
      from: fromEmail,
      to: to,
      subject: subject,
      html: html
    };

    // Add text version if provided
    if (text) {
      emailData.text = text;
    }

    // Add attachment if provided (for calendar .ics files)
    if (attachment && attachment.filename && attachment.content && attachment.contentType) {
      console.log('📎 Adding attachment:', {
        filename: attachment.filename,
        contentType: attachment.contentType,
        contentLength: attachment.content.length
      });
      
      // Decode base64 content for attachment
      const attachmentBuffer = Buffer.from(attachment.content, 'base64');
      
      emailData.attachment = {
        filename: attachment.filename,
        data: attachmentBuffer,
        contentType: attachment.contentType
      };
    }

    console.log('📤 Sending email via Mailgun...');
    console.log('📧 Final email data:', {
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject,
      hasHtml: !!emailData.html,
      hasText: !!emailData.text,
      hasAttachment: !!emailData.attachment
    });

    // Send email
    const result = await mg.messages.create(mailgunDomain, emailData);
    
    console.log('✅ Email sent successfully:', result);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ 
        success: true, 
        messageId: result.id,
        message: 'Email sent successfully',
        timestamp: new Date().toISOString(),
        hasAttachment: !!emailData.attachment
      })
    };

  } catch (error) {
    console.error('💥 Error sending email:', error);
    console.error('🔍 Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    // Handle specific Mailgun errors
    let errorMessage = 'Failed to send email';
    let errorDetails = error.message;
    
    if (error.status) {
      errorMessage = `Mailgun API error (${error.status})`;
      if (error.details) {
        errorDetails = error.details;
      }
    }
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ 
        error: errorMessage,
        details: errorDetails,
        timestamp: new Date().toISOString()
      })
    };
  }
};