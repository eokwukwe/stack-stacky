import mongoose from 'mongoose';
import log from 'fancy-log';

import config from '../config';

class DbConnection {
  static connectionURL() {
    if (process.env.NODE_ENV === 'production') {
      return config.databaseURL.prod;
    }

    if (process.env.NODE_ENV === 'test') {
      return config.databaseURL.test;
    }

    return config.databaseURL.dev;
  }

  static async connect() {
    try {
      const conn = await mongoose.connect(DbConnection.connectionURL(), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });

      log('Database connection successful', await conn.connection.db.databaseName);
      return conn;
    } catch (error) {
      console.error('Database connection error', error);
    }
  }

  static async dropDb() {
    const database = await DbConnection.connect();
    database.connection.db.dropDatabase();
  }
}

export default DbConnection;
