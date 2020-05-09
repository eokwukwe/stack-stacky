import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  databaseURL: {
    dev: process.env.DEV_DATABASE_URL,
    test: process.env.TEST_DATABASE_URL,
    prod: process.env.PROD_DATABASE_URL,
  },
};
