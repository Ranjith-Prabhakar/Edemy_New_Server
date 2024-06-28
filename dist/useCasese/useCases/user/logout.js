"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const errorHandler_1 = __importDefault(require("../../middlewares/errorHandler"));
const catchError_1 = require("../../middlewares/catchError");
const logout = async (cloudSession, requestManagement, req, res, next) => {
    try {
        await requestManagement.logoutCleanUp(res);
        const clearUserSession = await cloudSession.clearUserSession(req.user?._id);
        if (clearUserSession !== 1)
            return next(new errorHandler_1.default(500, "something went wrong"));
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.logout = logout;
//# sourceMappingURL=logout.js.map