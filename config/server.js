const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const errorMiddleware = require("../src/middleware/errorMiddleware");
const { verifyApiKeyGet } = require("../src/middleware/userAuth");
const router = require("./router");
const connectToMongoDB = require("./database");

const corsOptions = {
  origin: ["", "http://localhost:3000", process.env.CORS_ORIGIN],
  credentials: true,
};

// Connect to database
connectToMongoDB();

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1/admin", verifyApiKeyGet); // authentication for admin
// app.use("/api/v1/web", verifyApiKeyGet); // authentication for client

// Routes
app.use("/api/v1/", router);

// Error Middleware
app.use(errorMiddleware);

module.exports = app;
