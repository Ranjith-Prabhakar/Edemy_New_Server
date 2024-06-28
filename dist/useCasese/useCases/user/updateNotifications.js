"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNotifications = void 0;
const catchError_1 = require("../../middlewares/catchError");
const updateNotifications = async (notificationRepository, req, next) => {
    try {
        return await notificationRepository.updateNotifications(req.body.notificationHead, req.user?._id);
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.updateNotifications = updateNotifications;
//# sourceMappingURL=updateNotifications.js.map