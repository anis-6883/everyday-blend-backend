"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerValidation = exports.passwordValidation = exports.nameValidation = exports.emailValidation = void 0;
const express_validator_1 = require("express-validator");
const emailValidation = (0, express_validator_1.body)("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required!")
    .isEmail()
    .withMessage("Email is invalid!");
exports.emailValidation = emailValidation;
const nameValidation = (0, express_validator_1.body)("name").trim().notEmpty().withMessage("Name is required!");
exports.nameValidation = nameValidation;
const providerValidation = (0, express_validator_1.body)("provider")
    .trim()
    .isIn(["email", "google"])
    .withMessage("Provider is invalid!")
    .notEmpty()
    .withMessage("Provider is required!");
exports.providerValidation = providerValidation;
const passwordValidation = (0, express_validator_1.body)("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 8 })
    .withMessage("Password length at least 8 characters!");
exports.passwordValidation = passwordValidation;
//# sourceMappingURL=index.js.map