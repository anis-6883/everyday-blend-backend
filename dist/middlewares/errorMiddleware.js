"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (err, req, res, next) => {
    const status = err.code && err.meta && err.meta.target ? 400 : 500;
    const message = err.message || "Internal Server Error!";
    res.status(status).json({ status: false, message });
};
exports.default = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map