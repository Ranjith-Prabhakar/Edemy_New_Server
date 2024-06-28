"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const errorHandler_1 = __importDefault(require("../../middlewares/errorHandler"));
const catchError_1 = require("../../middlewares/catchError");
const registerUser = async (otpRepository, userRepository, sendMail, otpGenerator, jwtTokenGenerator, bcrypt, email, name, password, next) => {
    try {
        // checking whether any user exist in the same email
        const isUserExistOnUserRepo = await userRepository.findUserByEmail(email);
        if (isUserExistOnUserRepo)
            return next(new errorHandler_1.default(400, "user!!! already exist in the same mail id"));
        // checking wheter user already present in the otp repo
        const isUserOnOtpRepo = await otpRepository.findUser(email);
        if (isUserOnOtpRepo) {
            await sendMail.sendEmailVerification(name, email, isUserOnOtpRepo.otp);
            const hashPassword = await bcrypt.createHash(password);
            password = hashPassword;
            const jwtToken = await jwtTokenGenerator.createVerificationJWT({
                name,
                email,
                password,
            });
            return jwtToken;
        }
        else {
            const otp = await otpGenerator.generateOTP();
            await otpRepository.createOtpUserCollection({ email, otp });
            await sendMail.sendEmailVerification(name, email, otp);
            const hashPassword = await bcrypt.createHash(password);
            password = hashPassword;
            const jwtToken = await jwtTokenGenerator.createVerificationJWT({
                name,
                email,
                password,
            });
            return jwtToken;
        }
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.registerUser = registerUser;
//# sourceMappingURL=registerUser.js.map