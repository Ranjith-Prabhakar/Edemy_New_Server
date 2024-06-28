"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const errorHandler_1 = __importDefault(require("../../middlewares/errorHandler"));
const catchError_1 = require("../../middlewares/catchError");
const createUser = async (userRepository, otpRepository, jwtVerifier, verificationCode, token, next) => {
    try {
        const decode = (await jwtVerifier.verifyJwt(token));
        if (!decode)
            return next(new errorHandler_1.default(400, "token has been expired ,register again"));
        const result = await otpRepository.findAndDeleteUser(decode.email, verificationCode);
        if (!result)
            return next(new errorHandler_1.default(400, "verification code mismatch"));
        decode.isVerified = true;
        const newUser = await userRepository.createUser(decode);
        newUser.password = "";
        return newUser;
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.createUser = createUser;
//# sourceMappingURL=createUser.js.map