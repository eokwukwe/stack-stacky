import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE,
  databaseURL: {
    dev: process.env.DEV_DATABASE_URL,
    test: process.env.TEST_DATABASE_URL,
    prod: process.env.PROD_DATABASE_URL,
  },
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
};
