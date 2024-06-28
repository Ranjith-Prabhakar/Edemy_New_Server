"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotifications = void 0;
const catchError_1 = require("../../middlewares/catchError");
const getNotifications = async (notificationRepository, req, next) => {
    try {
        return await notificationRepository.getNotifications(req.user?._id);
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.getNotifications = getNotifications;
//# sourceMappingURL=getNotifications.js.map