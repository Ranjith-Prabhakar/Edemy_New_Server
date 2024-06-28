"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTtoken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class JWTtoken {
    // ***************************************************************************************
    JWT_VERIFICATION_KEY = process.env.JWT_VERIFICATION_KEY || "";
    JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY || "";
    JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY || "";
    async createVerificationJWT(payLoad) {
        const verifyToken = await jsonwebtoken_1.default.sign(payLoad, this.JWT_VERIFICATION_KEY, {
            expiresIn: "15m",
        });
        return verifyToken;
    }
    // ***************************************************************************************
    async createAccessAndRefreshToken(_id) {
        const accessToken = await jsonwebtoken_1.default.sign({ id: _id }, this.JWT_ACCESS_KEY, {
            expiresIn: "5h",
        });
        const refreshToken = await jsonwebtoken_1.default.sign({ id: _id }, this.JWT_REFRESH_KEY, {
            expiresIn: "3d",
        });
        return { accessToken, refreshToken };
    }
    // ***************************************************************************************
    async verifyJwt(token) {
        return (await jsonwebtoken_1.default.verify(token, this.JWT_VERIFICATION_KEY));
    }
    // ***************************************************************************************
    async forgotPasswordToken(userId, email) {
        const token = await jsonwebtoken_1.default.sign({ userId: userId, email: email }, this.JWT_VERIFICATION_KEY, {
            expiresIn: "10m",
        });
        return token;
    }
}
exports.JWTtoken = JWTtoken;
//# sourceMappingURL=jwt.js.map