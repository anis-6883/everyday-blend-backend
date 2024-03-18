"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const errorMiddleware_1 = __importDefault(require("../middlewares/errorMiddleware"));
const verifyApiKeyHeader_1 = __importDefault(require("../middlewares/verifyApiKeyHeader"));
const adminRoutes_1 = __importDefault(require("../routes/adminRoutes"));
const webRoutes_1 = __importDefault(require("../routes/webRoutes"));
const config_1 = __importDefault(require("./config"));
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
const env = process.env.NODE_ENV || "development";
// Batteries Include
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.static("public"));
app.use((0, cors_1.default)(config_1.default[env].corsOptions));
app.use(express_1.default.json({ limit: "100kb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "100kb" }));
// Connect to MongoDB with Mongoose
(0, database_1.default)(env);
// Home Route
app.get("/", (req, res) => {
    res.json({ message: "Assalamu Alaikum Prithibi!" });
});
// Main Routes
app.use("/api", verifyApiKeyHeader_1.default, webRoutes_1.default); // web
app.use("/api/admin", verifyApiKeyHeader_1.default, adminRoutes_1.default); // admin
// 404 Route
app.use((req, res, next) => {
    return res.status(404).send({ status: false, message: "This route does not exist!" });
});
// Error Handling Middleware
app.use(errorMiddleware_1.default);
exports.default = app;
//# sourceMappingURL=server.js.map