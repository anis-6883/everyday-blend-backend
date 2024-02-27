"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../../controllers/admin/authController");
const validations_1 = require("../validations");
const router = express_1.default.Router();
router.post("/register", [validations_1.firstNameValidation, validations_1.lastNameValidation, validations_1.emailValidation, validations_1.passwordValidation], authController_1.adminRegistration);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map