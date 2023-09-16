const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const errorMiddleware = require("./middleware/errorMiddleware");
const { verifyApiKeyGet } = require("./middleware/userAuth");
const userRoutes = require("./routes/userRoutes");
const folderRoutes = require("./routes/folderRoutes");
const quizRoutes = require("./routes/quizRoutes");

const corsOptions = {
  origin: ["", "http://localhost:3000", process.env.CORS_ORIGIN],
  credentials: true,
};

// Connect to MongoDB with Mongoose
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Database");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes & Middleware
app.use("/api/v1/user", verifyApiKeyGet, userRoutes);
app.use("/api/v1/folder", verifyApiKeyGet, folderRoutes);
app.use("/api/v1/quiz", verifyApiKeyGet, quizRoutes);

// Error Middleware
app.use(errorMiddleware);

module.exports = app;
