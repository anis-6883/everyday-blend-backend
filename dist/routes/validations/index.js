"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strongPasswordValidation = exports.weakPasswordValidation = exports.passwordValidation = exports.providerValidation = exports.lastNameValidation = exports.firstNameValidation = exports.emailValidation = void 0;
const express_validator_1 = require("express-validator");
exports.emailValidation = (0, express_validator_1.body)("email")
    .trim()
    .isEmail()
    .withMessage("Email is invalid!")
    .notEmpty()
    .withMessage("Email is required!");
exports.firstNameValidation = (0, express_validator_1.body)("firstName").trim().notEmpty().withMessage("First Name is required!");
exports.lastNameValidation = (0, express_validator_1.body)("lastName").trim().notEmpty().withMessage("Last Name is required!");
exports.providerValidation = (0, express_validator_1.body)("provider")
    .trim()
    .isIn(["email", "google"])
    .withMessage("Provider is invalid!")
    .notEmpty()
    .withMessage("Provider is required!");
exports.passwordValidation = (0, express_validator_1.body)("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 8 })
    .withMessage("Password length at least 8 characters!");
exports.weakPasswordValidation = (0, express_validator_1.body)("password").trim().notEmpty().withMessage("Password is required!");
exports.strongPasswordValidation = (0, express_validator_1.body)("password")
    .trim()
    .isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
})
    .withMessage("Password length at least 8 characters, 1 lowercase, 1 uppercase, 1 number, 1 symbol!");
//# sourceMappingURL=index.js.map