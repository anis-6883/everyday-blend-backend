"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXPIRE_TIME = exports.APP_SECRET = void 0;
const EXPIRE_TIME = 60 * 60 * 24 * 29 * 1000; // 29 Days
exports.EXPIRE_TIME = EXPIRE_TIME;
const APP_SECRET = process.env.APP_SECRET;
exports.APP_SECRET = APP_SECRET;
//# sourceMappingURL=constants.js.map