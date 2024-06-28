"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordOtpVerification = void 0;
const catchError_1 = require("../../middlewares/catchError");
const errorHandler_1 = __importDefault(require("../../middlewares/errorHandler"));
const forgotPasswordOtpVerification = async (otpRepository, jwtToken, req, next, token) => {
    try {
        const decode = await jwtToken.verifyJwt(token);
        if (!decode)
            return next(new errorHandler_1.default(400, "you didn`t made any request for change password"));
        // const isExist = await otpRepository.findUser(decode?.email );
        const isExist = await otpRepository.findAndVerifyUser(decode?.email, req.body.verificationCode);
        if (!isExist)
            return next(new errorHandler_1.default(400, "entered a wrong OTP..."));
        return { success: true, message: "otp matches " };
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.forgotPasswordOtpVerification = forgotPasswordOtpVerification;
//# sourceMappingURL=forgotPasswordOtpVerification.js.map