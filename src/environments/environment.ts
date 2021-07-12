import { config } from 'dotenv';
config(); // config will read your file, parse the contents, assign it to process.env

// import .env variables
const env = process.env; // this has ".env" keys & values

export default {
  mode: env.NODE_ENV,
  port: env.PORT ?? 5000,
  logs: env.NODE_ENV === 'production' ? 'combined' : 'dev',
  UPLOAD_LIMIT: 5, // MB
  MONGO_URI: 'mongodb://127.0.0.1:27017/default'
};
