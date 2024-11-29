import sgMail from '@sendgrid/mail';
import 'dotenv/config';

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (to, subject, text) => {
  const msg = {
    to, // Recipient email address
    from: 'hussain.kazemian@metropolia.fi', // Your verified sender email on SendGrid
    subject, // Subject of the email
    text, // Email content (plain text)
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};
