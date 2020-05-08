import express from "express";
import morgan from "morgan";
import log from "fancy-log";
import cors from "cors";

import config from "./config";

const app = express();

// Middlwares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.listen(config.port, () => log(`Server running on port ${config.port}`));
