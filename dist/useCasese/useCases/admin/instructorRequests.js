"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instructorRequests = void 0;
const catchError_1 = require("../../middlewares/catchError");
const instructorRequests = async (instructorAgreementRepository, next) => {
    try {
        return await instructorAgreementRepository.getAgreements();
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.instructorRequests = instructorRequests;
//# sourceMappingURL=instructorRequests.js.map