import cors from "cors";
import "dotenv/config";
import express from "express";
import logger from "morgan";
import errorMiddleware from "../middlewares/errorMiddleware";
import verifyApiKeyHeader from "../middlewares/verifyApiKeyHeader";
import adminRoutes from "../routes/adminRoutes";
import webRoutes from "../routes/webRoutes";
import config from "./config";
import connectToDatabase from "./database";

const app = express();
const env = process.env.NODE_ENV || "development";

// Batteries Include
app.use(logger("dev"));
app.use(express.static("public"));
app.use(cors(config[env].corsOptions));
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

// Connect to MongoDB with Mongoose
connectToDatabase(env);

// Home Route
app.get("/", (req, res) => {
  res.json({ message: "Assalamu Alaikum Prithibi!" });
});

// Main Routes
app.use("/api", verifyApiKeyHeader, webRoutes); // web
app.use("/api/admin", verifyApiKeyHeader, adminRoutes); // admin

// 404 Route
app.use((req, res, next) => {
  return res.status(404).send({ status: false, message: "This route does not exist!" });
});

// Error Handling Middleware
app.use(errorMiddleware);

export default app;
