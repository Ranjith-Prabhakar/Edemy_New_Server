"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveOrRejectInstructor = void 0;
const catchError_1 = require("../../middlewares/catchError");
const approveOrRejectInstructor = async (userRepository, instrctorAgreementRepository, req, next) => {
    try {
        if (req.body.action === "approved") {
            const result = await instrctorAgreementRepository.updateStatus(req.body.agreementId, "approved");
            if (result.status === (500 | 404)) {
                return result;
            }
            else {
                await userRepository.findAndUpdate(req.body);
                return result;
            }
        }
        else {
            const result = await instrctorAgreementRepository.updateStatus(req.body.agreementId, "rejected");
            return result;
        }
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.approveOrRejectInstructor = approveOrRejectInstructor;
//# sourceMappingURL=approveOrRejectInstructor.js.map