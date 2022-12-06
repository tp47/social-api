import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mountRoutes from "./routes/index.js";

config();

const PORT = parseInt(process.env.PORT) || 8080;

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

mountRoutes(app);

const start = () => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
};

export { start };
