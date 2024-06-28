"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler extends Error {
    statusCode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ErrorHandler;
//# sourceMappingURL=errorHandler.js.map