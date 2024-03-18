"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../../controllers/admin/auth.controller");
const validations_1 = require("../validations");
const router = express_1.default.Router();
router.post("/register", [validations_1.firstNameValidation, validations_1.lastNameValidation, validations_1.emailValidation, validations_1.passwordValidation], auth_controller_1.adminRegistration);
router.post("/login", [validations_1.emailValidation, validations_1.weakPasswordValidation], auth_controller_1.adminLogin);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map