import express from "express";
import userRoutes from "./web/userRoutes";
const router = express.Router();

router.use("/user", userRoutes);

export default router;
