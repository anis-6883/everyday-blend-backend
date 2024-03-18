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
exports.exclude = exports.excludeMany = exports.validatePassword = exports.generateSignature = exports.generatePassword = exports.generateSalt = exports.transformErrorsToMap = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../configs/constants");
const transformErrorsToMap = (errors) => {
    const errorMap = {};
    errors.forEach((error) => {
        const { path, msg } = error;
        errorMap[path] = msg;
    });
    return errorMap;
};
exports.transformErrorsToMap = transformErrorsToMap;
const generateSalt = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.genSalt();
});
exports.generateSalt = generateSalt;
const generatePassword = (password, salt) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, salt);
});
exports.generatePassword = generatePassword;
const generateSignature = (payload, expiresIn) => {
    return jsonwebtoken_1.default.sign(payload, constants_1.APP_SECRET, { expiresIn });
};
exports.generateSignature = generateSignature;
const validatePassword = (enteredPassword, savedPassword, salt) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield (0, exports.generatePassword)(enteredPassword, salt)) === savedPassword;
});
exports.validatePassword = validatePassword;
const excludeMany = (array, keys) => __awaiter(void 0, void 0, void 0, function* () {
    let newArray = [];
    array === null || array === void 0 ? void 0 : array.map((item) => {
        const temp = Object.assign({}, item._doc);
        for (let key of keys) {
            delete temp[key];
        }
        newArray.push(temp);
    });
    return newArray;
});
exports.excludeMany = excludeMany;
const exclude = (existingApp, keys) => {
    for (let key of keys) {
        delete existingApp[key];
    }
    return existingApp;
};
exports.exclude = exclude;
//# sourceMappingURL=index.js.map