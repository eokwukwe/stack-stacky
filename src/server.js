import cors from "cors";
import morgan from "morgan";
import log from "fancy-log";
import express from "express";
import swaggerUi from "swagger-ui-express";

import config from "./config";
import DbConnection from "./database";
import swaggerDoc from "./swagger.json";

const app = express();
const isProduction = process.env.NODE_ENV === "production";

// Connect to database
DbConnection.connect();

// Middlwares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error("Resource does not exist");
  error.status = 404;
  next(error);
});

if (!isProduction) {
  // eslint-disable-next-line no-unused-vars
  app.use((error, req, res, next) => {
    log(error.stack);
    res.status(error.status || 500).json({
      error: {
        message: error.message,
      },
    });
  });
}

const port = process.env.NODE_ENV === "test" ? 8378 : parseInt(config.port, 10);
export const server = app.listen(port, () => {
  log(`Server is running on http://localhost:${port}`);
});

export default app;
