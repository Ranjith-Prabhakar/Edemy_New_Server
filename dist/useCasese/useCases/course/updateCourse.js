"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCourse = void 0;
const notification_1 = require("../../../entities/notification");
const catchError_1 = require("../../middlewares/catchError");
const StaticClassProperty_1 = require("../../staticClassProperty/StaticClassProperty");
const updateCourse = async (courseRepository, userRepository, notificationRepository, req, next) => {
    try {
        const courseResutl = await courseRepository.updateCourse(req.user?._id, req.body);
        if (courseResutl) {
            const admin = await userRepository.getAdmin();
            if (admin) {
                await notificationRepository.addNotification(admin._id, notification_1.ENotification.courseApprovalRequest);
                const adminSocket = StaticClassProperty_1.SocketClass.SocketUsers[admin._id];
                if (adminSocket) {
                    adminSocket.emit("fromServerCourseAdded", courseResutl.data, "new course request has been made");
                }
            }
        }
        return courseResutl;
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.updateCourse = updateCourse;
//# sourceMappingURL=updateCourse.js.map