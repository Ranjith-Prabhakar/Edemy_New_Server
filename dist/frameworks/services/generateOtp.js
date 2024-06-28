"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateOtp = void 0;
class GenerateOtp {
    async generateOTP() {
        const numericChars = "0123456789";
        let otp = "";
        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * numericChars.length);
            otp += numericChars[randomIndex];
        }
        return otp;
    }
}
exports.GenerateOtp = GenerateOtp;
//# sourceMappingURL=generateOtp.js.map