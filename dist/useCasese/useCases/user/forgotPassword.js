"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = void 0;
const errorHandler_1 = __importDefault(require("../../middlewares/errorHandler"));
const catchError_1 = require("../../middlewares/catchError");
const forgotPassword = async (otpRepository, userRepository, sendMail, otpGenerator, jwtToken, req, next) => {
    try {
        const user = await userRepository.findUserByEmail(req.body.email);
        if (!user)
            next(new errorHandler_1.default(400, "user not found for this mail id"));
        const isExistInOtpRep = await otpRepository.findUser(req.body.email);
        if (isExistInOtpRep) {
            await sendMail.sendEmailVerification(user?.name, user?.email, isExistInOtpRep.otp);
            const verificationToken = await jwtToken.forgotPasswordToken(user?._id, user?.email);
            return verificationToken;
        }
        else {
            const otp = await otpGenerator.generateOTP();
            await sendMail.sendEmailVerification(user?.name, user?.email, otp);
            const verificationToken = await jwtToken.forgotPasswordToken(user?._id, user?.email);
            await otpRepository.createOtpUserCollection({
                email: user?.email,
                otp,
            });
            return verificationToken;
        }
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.forgotPassword = forgotPassword;
//# sourceMappingURL=forgotPassword.js.map