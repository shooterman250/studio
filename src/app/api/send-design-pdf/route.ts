
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
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SMTP_HOST,
      port: Number(process.env.EMAIL_SMTP_PORT || 587),
      secure: Number(process.env.EMAIL_SMTP_PORT || 587) === 465, // true for 465, false for other ports (STARTTLS)
      auth: {
        user: process.env.EMAIL_SMTP_USER,
        pass: process.env.EMAIL_SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM_ADDRESS, 
      to: recipientEmail,
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
    console.error('Full error object sending email:', error); // Enhanced logging for the full error

    let errorDetails = 'An unknown error occurred.';
    if (error instanceof Error) {
      errorDetails = error.message;
    }
    
    // Add more specific nodemailer error codes if available
    if (error && typeof error === 'object') {
      if ('code' in error && error.code) {
        errorDetails += ` (Code: ${error.code})`;
      }
      if ('responseCode' in error && error.responseCode) {
        errorDetails += ` (Response Code: ${error.responseCode})`;
      }
      if ('command' in error && error.command) {
        errorDetails += ` (Command: ${error.command})`;
      }
    }

    return NextResponse.json({ error: 'Failed to send email.', details: errorDetails }, { status: 500 });
  }
}
