import fs from 'fs';

// configure for emailing
import env from '@env';
import handlebars from 'handlebars';

const { EMAIL_GOOGLE_API_KEY, EMAIL_FROM_SUPPORT, SEC_ADMIN_EMAIL, EMAIL_TEMPLATE_BASE } = env;

// load template file & inject data => return content with injected data.
const template = (fileName: string, data: any) => {
  const content = fs.readFileSync(EMAIL_TEMPLATE_BASE + fileName).toString();
  const inject = handlebars.compile(content);
  return inject(data);
};

// --------- Email Templates --------- //

export function welcomeEmail({ name, email, url }: { name: string; email: string; url: string }) {
  return {
    from: EMAIL_FROM_SUPPORT,
    to: `${name} <${email}>`,
    subject: `Welcome!`,
    text: template('welcome.txt', { name, email, url }),
    html: template('welcome.html', { name, email, url })
  };
}

// resetPswEmail, forgotPswEmail, etc.

// --------- Nodemailer and Mailgun setup --------- //
const nodemailer = require('nodemailer');
let emailClient: any = null;
if (EMAIL_GOOGLE_API_KEY) {
  // Configure transport options
  const mailOptions = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: SEC_ADMIN_EMAIL, // process.env.MAILGUN_ACTIVE_API_KEY,
      pass: EMAIL_GOOGLE_API_KEY // process.env.MAILGUN_DOMAIN,
    }
  };

  emailClient = nodemailer.createTransport(mailOptions);
}

export function sendEmail(data: any) {
  if (!emailClient) {
    return;
  }

  return new Promise((resolve, reject) => {
    emailClient
      ? emailClient.sendMail(data, (err: any, info: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(info);
          }
        })
      : '';
  });
}
