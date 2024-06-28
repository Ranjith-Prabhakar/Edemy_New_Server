"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gAuth = void 0;
const catchError_1 = require("../../middlewares/catchError");
const errorHandler_1 = __importDefault(require("../../middlewares/errorHandler"));
const gAuth = async (authService, userRepository, token, cloudSession, req, next) => {
    try {
        const mailData = (await authService.getVerification(req));
        if (mailData.email) {
            //check whether the user already registered
            const user = await userRepository.findUserByEmail(mailData.email);
            if (user) {
                if (user.status === "frozen") {
                    next(new errorHandler_1.default(400, "access has been denied by admin"));
                }
                const tokens = await token.createAccessAndRefreshToken(user?._id);
                await cloudSession.createUserSession(user?._id, user);
                return {
                    user,
                    tokens,
                };
            }
            else {
                const user = await userRepository.createUser({
                    name: mailData.name,
                    email: mailData.email,
                    password: "googleAuthPassword",
                });
                const tokens = await token.createAccessAndRefreshToken(user?._id);
                await cloudSession.createUserSession(user?._id, user);
                return {
                    user,
                    tokens,
                };
            }
        }
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.gAuth = gAuth;
//# sourceMappingURL=gAuth.js.map