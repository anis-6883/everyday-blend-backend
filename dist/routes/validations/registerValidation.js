"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
exports.default = [
    (0, express_validator_1.body)('name').trim().notEmpty().withMessage('Name is required!'),
    (0, express_validator_1.body)('email').trim().notEmpty().withMessage('Email is required!').isEmail().withMessage('Email is invalid!'),
    (0, express_validator_1.body)('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required!')
        .isLength({ min: 8 })
        .withMessage('Password length at least 8 characters!'),
    (0, express_validator_1.body)('provider')
        .trim()
        .isIn(['email', 'google'])
        .withMessage('Provider is invalid!')
        .notEmpty()
        .withMessage('Provider is required!')
];
//# sourceMappingURL=registerValidation.js.map