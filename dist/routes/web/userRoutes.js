"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../../controllers/web/user.controller");
const validations_1 = require("../validations");
const router = express_1.default.Router();
router.post("/register", [validations_1.firstNameValidation, validations_1.lastNameValidation, validations_1.emailValidation, validations_1.passwordValidation, validations_1.providerValidation], user_controller_1.userRegistration);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map