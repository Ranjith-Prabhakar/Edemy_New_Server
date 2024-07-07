"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendOtp = void 0;
const catchError_1 = require("../../middlewares/catchError");
const resendOtp = async (jwtToken, otpRepository, sendMailService, req, next) => {
    try {
        const decode = await jwtToken.verifyJwt(req.cookies.verificationToken);
        const otp = await otpRepository.findUser(decode.email);
        const name = decode;
        const sendMail = await sendMailService.sendEmailVerification(name?.name, otp?.email, otp?.otp);
        return {
            success: sendMail.success,
            message: sendMail.success
                ? "otp has been resend"
                : "faild to resend the otp",
        };
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.resendOtp = resendOtp;
//# sourceMappingURL=resendOtp.js.map