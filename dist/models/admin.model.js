"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const adminSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        default: null,
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
    versionKey: false,
});
const Admin = mongoose_1.default.model("Admin", adminSchema);
exports.default = Admin;
//# sourceMappingURL=admin.model.js.map