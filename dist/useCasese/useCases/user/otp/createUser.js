"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOtpUserCollection = void 0;
const createOtpUserCollection = async (otpRepository, iOtpUser) => {
    await otpRepository.createOtpUserCollection(iOtpUser);
};
exports.createOtpUserCollection = createOtpUserCollection;
//# sourceMappingURL=createUser.js.map