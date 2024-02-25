import express from "express";
import authRoutes from "./admin/authRoutes";
const router = express.Router();

router.use("/", authRoutes);

export default router;
