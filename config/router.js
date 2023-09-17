const express = require("express");
const userRoutes = require("../src/routes/userRoutes"); // Import user routes
const folderRoutes = require("../src/routes/folderRoutes"); // Import user routes

const router = express.Router();

// Use the userRoutes, productRoutes, and orderRoutes in your router
router.use("/user", userRoutes);
router.use("/folder", folderRoutes);

module.exports = router;
