"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetForgotPassword = void 0;
const catchError_1 = require("../../middlewares/catchError");
const errorHandler_1 = __importDefault(require("../../middlewares/errorHandler"));
const resetForgotPassword = async (userRepository, otpRepository, jwtVerifier, bcrypt, req, token, next) => {
    try {
        const decode = (await jwtVerifier.verifyJwt(token));
        const otpRepAction = await otpRepository.findByMailAndDelete(decode.email);
        if (!otpRepAction)
            return next(new errorHandler_1.default(400, "you didn`t make any request to change the password"));
        const password = await bcrypt.createHash(req.body.password);
        const user = await userRepository.findByIdAndUpdate(decode.userId, { password: password });
        if (user) {
            return {
                success: true,
                message: "user password has been updated",
            };
        }
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.resetForgotPassword = resetForgotPassword;
//# sourceMappingURL=resetForgotPassword.js.map