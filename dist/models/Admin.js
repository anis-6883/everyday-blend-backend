"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const adminSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        default: "",
    },
    lastName: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        default: "admin",
    },
    status: {
        type: String,
        default: "1",
    },
}, {
    timestamps: true,
});
const Admin = mongoose_1.default.model("Admin", adminSchema);
module.exports = Admin;
//# sourceMappingURL=Admin.js.map