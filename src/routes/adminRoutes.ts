import express from "express";
import authRoutes from "./admin/auth.routes";
const router = express.Router();

router.use("/", authRoutes);

export default router;
