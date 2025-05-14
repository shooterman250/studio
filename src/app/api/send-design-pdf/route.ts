
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { pdfDataUri, recipientEmail, subject, bodyText, fileName } = await request.json();

    if (!pdfDataUri || !recipientEmail || !subject || !bodyText || !fileName) {
      return NextResponse.json({ error: 'Missing required fields: pdfDataUri, recipientEmail, subject, bodyText, fileName' }, { status: 400 });
    }

    // Extract base64 content and mime type from data URI
    const parts = pdfDataUri.match(/^data:(.+);base64,(.+)$/);
    if (!parts || parts.length !== 3) {
        return NextResponse.json({ error: 'Invalid PDF data URI format.' }, { status: 400 });
    }
    const mimeType = parts[1];
    const pdfBase64 = parts[2];

    // Create a transporter object using SMTP transport
    // You MUST configure these environment variables.
    // For services like SendGrid, Mailgun, you might use an API key as the password.
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SMTP_HOST, // e.g., 'smtp.sendgrid.net' or 'smtp.gmail.com'
      port: Number(process.env.EMAIL_SMTP_PORT || 587), // 587 for TLS, 465 for SSL
      secure: Number(process.env.EMAIL_SMTP_PORT || 587) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SMTP_USER, // Your email service username or API key ID
        pass: process.env.EMAIL_SMTP_PASSWORD, // Your email service password or API key
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM_ADDRESS, // Sender address (must be a verified sender in most services)
      to: recipientEmail, // List of receivers
      subject: subject, // Subject line
      text: bodyText, // Plain text body
      html: `<p>${bodyText.replace(/\n/g, '<br>')}</p>`, // HTML body
      attachments: [
        {
          filename: fileName, // e.g., 'design-summary.pdf'
          content: Buffer.from(pdfBase64, 'base64'),
          contentType: mimeType, // 'application/pdf'
        },
      ],
    };

    // Send mail with defined transport object
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Error sending email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to send email.', details: errorMessage }, { status: 500 });
  }
}
