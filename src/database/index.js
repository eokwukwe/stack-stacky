import mongoose from "mongoose";
import log from "fancy-log";

import config from "../config";

class DbConnection {
  static connectionURL() {
    if (process.env.NODE_ENV === "production") {
      return config.databaseURL.prod;
    }

    if (process.env.NODE_ENV === "test") {
      return config.databaseURL.test;
    }

    return config.databaseURL.dev;
  }

  static async connect() {
    try {
     await mongoose.connect(DbConnection.connectionURL(), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });

      log("Database connection successful");
    } catch (error) {
      console.error("Database connection error");
    }
  }
}

export default DbConnection;
