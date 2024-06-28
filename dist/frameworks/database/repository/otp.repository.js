"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpRepository = void 0;
const otp_model_1 = __importDefault(require("../models/otp.model"));
class OtpRepository {
    // **************************************************************************************
    async createOtpUserCollection(newUser) {
        try {
            const result = await otp_model_1.default.create(newUser);
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    // **************************************************************************************
    async findUser(email) {
        try {
            return await otp_model_1.default.findOne({ email });
        }
        catch (error) {
            throw error;
        }
    }
    // **************************************************************************************
    async findAndDeleteUser(email, verificationCode) {
        try {
            const result = await otp_model_1.default.findOneAndDelete({
                email,
                otp: verificationCode,
            });
            if (result) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            throw error;
        }
    }
    // **************************************************************************************
    async findByMailAndDelete(email) {
        try {
            const result = await otp_model_1.default.deleteOne({ email: email });
            if (!result) {
                return false;
            }
            else {
                return true;
            }
        }
        catch (error) {
            throw error;
        }
    }
    // **************************************************************************************
    async findAndVerifyUser(email, otp) {
        try {
            return await otp_model_1.default.findOne({ email, otp });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.OtpRepository = OtpRepository;
//# sourceMappingURL=otp.repository.js.map