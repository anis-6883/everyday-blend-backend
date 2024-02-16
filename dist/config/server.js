"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const errorMiddleware_1 = __importDefault(require("../middlewares/errorMiddleware"));
const config_1 = __importDefault(require("./config"));
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
const env = process.env.NODE_ENV || "development";
app.use((0, cors_1.default)());
app.use(express_1.default.static("public"));
app.use(express_1.default.json({ limit: "100mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "100mb" }));
// Connect to MongoDB with Mongoose
(0, database_1.default)(config_1.default[env].databaseURI);
app.get("/", (req, res) => {
    res.json({ message: "Hello World!" });
});
// Error Handling Middleware
app.use(errorMiddleware_1.default);
exports.default = app;
//# sourceMappingURL=server.js.map