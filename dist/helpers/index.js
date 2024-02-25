"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformErrorsToMap = void 0;
const transformErrorsToMap = (errors) => {
    const errorMap = {};
    errors.forEach((error) => {
        const { path, msg } = error;
        errorMap[path] = msg;
    });
    return errorMap;
};
exports.transformErrorsToMap = transformErrorsToMap;
//# sourceMappingURL=index.js.map