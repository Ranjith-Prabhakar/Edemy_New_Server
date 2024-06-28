"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.beInstructor = void 0;
const StaticClassProperty_1 = require("../../staticClassProperty/StaticClassProperty");
const notification_1 = require("../../../entities/notification");
const catchError_1 = require("../../middlewares/catchError");
const beInstructor = async (instructorAgreementRepository, userRepository, notificationRepository, req, next) => {
    try {
        const result = await instructorAgreementRepository.createAgreement({
            userId: req.user?._id,
            userName: req.user?.name,
            ...req.body,
        });
        if (result.agreement) {
            const admin = await userRepository.getAdmin();
            const notificationRepoResult = await notificationRepository.addNotification(admin?._id, notification_1.ENotification.instructorRequests);
            if (notificationRepoResult) {
                if (admin) {
                    const adminSocket = StaticClassProperty_1.SocketClass.SocketUsers[admin._id];
                    adminSocket.emit("fromServerInstructorRequestSubmitted", result.agreement);
                }
            }
        }
        return result;
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.beInstructor = beInstructor;
//# sourceMappingURL=beInstructor.js.map