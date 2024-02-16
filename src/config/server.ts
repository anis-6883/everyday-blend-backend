import cors from "cors";
import "dotenv/config";
import express from "express";
import errorMiddleware from "../middlewares/errorMiddleware";
import config from "./config";
import connectToDatabase from "./database";

const app = express();
const env = process.env.NODE_ENV || "development";

app.use(cors());
app.use(express.static("public"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

// Connect to MongoDB with Mongoose
connectToDatabase(config[env].databaseURI);

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// Error Handling Middleware
app.use(errorMiddleware);

export default app;
