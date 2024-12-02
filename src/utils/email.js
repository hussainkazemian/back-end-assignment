import sgMail from '@sendgrid/mail';
import 'dotenv/config';


// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Function to send an email
 * @param {string} to - Recipient email address
 * @param {string} subject - Subject of the email
 * @param {string} text - Plain text content of the email
 */
export const sendEmail = async (to, subject, text) => {
  const msg = {
    to,
    from: 'hussain.kazemian@metropolia.fi', // Your verified sender email
    subject,
    text,
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};



