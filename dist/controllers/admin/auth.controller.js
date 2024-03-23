"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = exports.adminRegistration = void 0;
const express_validator_1 = require("express-validator");
const constants_1 = require("../../configs/constants");
const helpers_1 = require("../../helpers");
const admin_model_1 = __importDefault(require("../../models/admin.model"));
// Admin Registration
const adminRegistration = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        const errorMessages = (0, helpers_1.transformErrorsToMap)(errors.array());
        if (!errors.isEmpty()) {
            return res.json({ status: false, errors: errorMessages });
        }
        const { email, password, firstName, lastName } = req.body;
        const existingAdmin = yield admin_model_1.default.findOne({ email });
        if (existingAdmin) {
            return res.json({ status: false, message: "This email already exist!" });
        }
        const salt = yield (0, helpers_1.generateSalt)();
        const hashedPassword = yield (0, helpers_1.generatePassword)(password, salt);
        const newAdmin = new admin_model_1.default({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            salt: salt,
        });
        yield newAdmin.save();
        const responseData = (0, helpers_1.exclude)(newAdmin._doc, ["__v", "password", "salt", "createdAt", "updatedAt"]);
        const accessToken = (0, helpers_1.generateSignature)({ email, role: "admin" }, 60 * 60 * 24); // 1 Day
        return res.json({
            status: true,
            message: "Admin Registered successfully!",
            data: Object.assign(Object.assign({}, responseData), { accessToken }),
        });
    }
    catch (error) {
        next(error);
    }
});
exports.adminRegistration = adminRegistration;
// Admin Login
const adminLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        const errorMessages = (0, helpers_1.transformErrorsToMap)(errors.array());
        if (!errors.isEmpty()) {
            return res.json({ status: false, errors: errorMessages });
        }
        const { email, password } = req.body;
        const existingAdmin = yield admin_model_1.default.findOne({ email });
        if (!existingAdmin) {
            return res.json({ status: false, message: "Your credentials are incorrect!" });
        }
        const validPassword = yield (0, helpers_1.validatePassword)(password, existingAdmin.password, existingAdmin.salt);
        if (!validPassword) {
            return res.json({ status: false, message: "Your credentials are incorrect!" });
        }
        const accessToken = (0, helpers_1.generateSignature)({
            email: existingAdmin.email,
            role: existingAdmin.role,
        }, 60 * 60 * 24 * 30 // 30 Days
        );
        const refreshToken = (0, helpers_1.generateSignature)({
            email: existingAdmin.email,
            role: existingAdmin.role,
        }, 60 * 60 * 24 * 60 // 60 Days
        );
        const admin = (0, helpers_1.exclude)(existingAdmin._doc, [
            "_id",
            "__v",
            "verify_code",
            "password",
            "salt",
            "forget_code",
            "createdAt",
            "updatedAt",
        ]);
        return res.json({
            status: true,
            message: "Admin Login Successfully!",
            data: Object.assign({ accessToken,
                refreshToken, expiresIn: new Date().setTime(new Date().getTime() + constants_1.EXPIRE_TIME) }, admin),
        });
    }
    catch (error) {
        next(error);
    }
});
exports.adminLogin = adminLogin;
//# sourceMappingURL=auth.controller.js.map