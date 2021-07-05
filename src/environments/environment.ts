import { config } from 'dotenv';
config(); // config will read your file, parse the contents, assign it to process.env

// import .env variables
const env = process.env; // this has ".env" keys & values

export default {
  mode: env.NODE_ENV,
  port: env.PORT ?? 5000,
  emailEnabled: env.EMAIL_GOOGLE_API_KEY ? true : false,
  JWT_SECRET: env.JWT_SECRET,
  JWT_EXPIRATION_MINUTES: env.JWT_EXPIRATION_MINUTES,
  UPLOAD_LIMIT: 5, // MB
  EMAIL_TEMPLATE_BASE: './src/templates/emails/',
  EMAIL_FROM_SUPPORT: env.EMAIL_FROM_SUPPORT,
  SEC_ADMIN_EMAIL: env.SEC_ADMIN_EMAIL,
  EMAIL_GOOGLE_API_KEY: env.EMAIL_GOOGLE_API_KEY,
  logs: env.NODE_ENV === 'production' ? 'combined' : 'dev'
};
