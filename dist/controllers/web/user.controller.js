"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegistration = void 0;
const express_validator_1 = require("express-validator");
const helpers_1 = require("../../helpers");
exports.userRegistration = (0, helpers_1.asyncHandler)((req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    const errorMessages = (0, helpers_1.transformErrorsToMap)(errors.array());
    if (!errors.isEmpty()) {
        return (0, helpers_1.apiResponse)(res, 400, false, "Invalid data!", errorMessages);
    }
    return (0, helpers_1.apiResponse)(res, 200, true, "User Registration!");
});
//# sourceMappingURL=user.controller.js.map