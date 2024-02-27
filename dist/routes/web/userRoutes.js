"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const helpers_1 = require("../../helpers");
const validations_1 = require("../validations");
const router = express_1.default.Router();
router.post("/register", [validations_1.firstNameValidation, validations_1.emailValidation, validations_1.passwordValidation, validations_1.providerValidation], (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    const errorMessages = (0, helpers_1.transformErrorsToMap)(errors.array());
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: false, errors: errorMessages });
    }
    res.json({ message: "User Registration!" });
});
exports.default = router;
//# sourceMappingURL=userRoutes.js.map