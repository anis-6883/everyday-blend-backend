"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weakPasswordValidation = exports.strongPasswordValidation = exports.providerValidation = exports.passwordValidation = exports.lastNameValidation = exports.firstNameValidation = exports.emailValidation = void 0;
const express_validator_1 = require("express-validator");
const emailValidation = (0, express_validator_1.body)("email").trim().isEmail().withMessage("Email is invalid!").notEmpty().withMessage("Email is required!");
exports.emailValidation = emailValidation;
const firstNameValidation = (0, express_validator_1.body)("firstName").trim().notEmpty().withMessage("First Name is required!");
exports.firstNameValidation = firstNameValidation;
const lastNameValidation = (0, express_validator_1.body)("lastName").trim().notEmpty().withMessage("Last Name is required!");
exports.lastNameValidation = lastNameValidation;
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
const weakPasswordValidation = (0, express_validator_1.body)("password").trim().notEmpty().withMessage("Password is required!");
exports.weakPasswordValidation = weakPasswordValidation;
const strongPasswordValidation = (0, express_validator_1.body)("password")
    .trim()
    .isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
})
    .withMessage("Password length at least 8 characters, 1 lowercase, 1 uppercase, 1 number, 1 symbol!");
exports.strongPasswordValidation = strongPasswordValidation;
//# sourceMappingURL=index.js.map