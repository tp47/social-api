import express from "express";
import mountRoutes from "./routes/index.js";
import { config } from 'dotenv';

config();

const PORT = parseInt(process.env.PORT) || 8080;

const app = express();
mountRoutes(app);

const start = () => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
};

export { start };
