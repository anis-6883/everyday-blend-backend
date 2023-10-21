const express = require("express");
const userRoutes = require("../src/routes/userRoutes"); // Import user routes
const folderRoutes = require("../src/routes/folderRoutes"); // Import user routes
const { verifyApiKeyGet } = require("../src/middleware/userAuth");

const router = express.Router();

// Use the userRoutes, productRoutes, and orderRoutes in your router
router.use("/user", verifyApiKeyGet, userRoutes);
router.use("/folder", folderRoutes);

module.exports = router;
