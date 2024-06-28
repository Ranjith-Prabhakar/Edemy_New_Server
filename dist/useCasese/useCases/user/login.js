"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const errorHandler_1 = __importDefault(require("../../middlewares/errorHandler"));
const catchError_1 = require("../../middlewares/catchError");
const login = async (userRepository, bcrypt, token, cloudSession, email, password, next) => {
    try {
        const user = await userRepository.findUserByEmail(email);
        if (!user)
            return next(new errorHandler_1.default(400, "invalid email id"));
        if (user.status === "frozen")
            return next(new errorHandler_1.default(400, "access has been denied by admin"));
        const hashPassword = user.password;
        const result = await bcrypt.comparePassword(password, hashPassword);
        if (!result) {
            next(new errorHandler_1.default(400, "invalid password "));
        }
        else {
            user.password = "";
            const tokens = await token.createAccessAndRefreshToken(user?._id);
            await cloudSession.createUserSession(user?._id, user);
            return {
                user,
                tokens,
            };
        }
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.login = login;
//# sourceMappingURL=login.js.map