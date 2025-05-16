
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { pdfDataUri, recipientEmail, subject, bodyText, fileName } = await request.json();

    if (!pdfDataUri || !recipientEmail || !subject || !bodyText || !fileName) {
      return NextResponse.json({ error: 'Missing required fields: pdfDataUri, recipientEmail, subject, bodyText, fileName' }, { status: 400 });
    }

    // Check for essential environment variables
    const requiredEnvVars = [
      'EMAIL_SMTP_HOST',
      'EMAIL_SMTP_PORT',
      'EMAIL_SMTP_USER',
      'EMAIL_SMTP_PASSWORD',
      'EMAIL_FROM_ADDRESS',
    ];
    const missingEnvVars = requiredEnvVars.filter(v => !process.env[v]);

    if (missingEnvVars.length > 0) {
      console.error(`Email sending failed: Missing required environment variables: ${missingEnvVars.join(', ')}`);
      return NextResponse.json(
        { 
          error: 'Email server configuration is incomplete.',
          details: `The following server environment variables are missing: ${missingEnvVars.join(', ')}. Please contact the administrator.`
        }, 
        { status: 500 }
      );
    }

    // Extract base64 content and mime type from data URI
    const parts = pdfDataUri.match(/^data:(.+);base64,(.+)$/);
    if (!parts || parts.length !== 3) {
        return NextResponse.json({ error: 'Invalid PDF data URI format.' }, { status: 400 });
    }
    const mimeType = parts[1];
    const pdfBase64 = parts[2];

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SMTP_HOST,
      port: Number(process.env.EMAIL_SMTP_PORT || 587),
      secure: Number(process.env.EMAIL_SMTP_PORT || 587) === 465, // true for 465, false for other ports (STARTTLS)
      auth: {
        user: process.env.EMAIL_SMTP_USER,
        pass: process.env.EMAIL_SMTP_PASSWORD,
      },
      // It's good practice to add a timeout
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 10000, // 10 seconds
      socketTimeout: 10000, // 10 seconds
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM_ADDRESS, 
      to: recipientEmail, // This will be khinterdesigns@gmail.com based on your request for the frontend
      subject: subject,
      text: bodyText,
      html: `<p>${bodyText.replace(/\n/g, '<br>')}</p>`,
      attachments: [
        {
          filename: fileName,
          content: Buffer.from(pdfBase64, 'base64'),
          contentType: mimeType,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Full error object sending email:', error); 

    let errorDetails = 'An unknown error occurred while trying to send the email.';
    if (error instanceof Error) {
      errorDetails = error.message;
    }
    
    // Check for nodemailer specific error codes
    if (error && typeof error === 'object') {
      const nodemailerError = error as { code?: string; responseCode?: number; command?: string; message: string };
      let details = `Message: ${nodemailerError.message}`;
      if (nodemailerError.code) {
        details += ` (Code: ${nodemailerError.code})`;
      }
      if (nodemailerError.responseCode) {
        details += ` (Response Code: ${nodemailerError.responseCode})`;
      }
      if (nodemailerError.command) {
        details += ` (Command: ${nodemailerError.command})`;
      }
      errorDetails = details;
    }

    return NextResponse.json({ error: 'Failed to send email.', details: errorDetails }, { status: 500 });
  }
}
