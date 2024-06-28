"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveOrRejectVideo = void 0;
const catchError_1 = require("../../middlewares/catchError");
const approveOrRejectVideo = async (courseRepository, req, next) => {
    try {
        const { courseId, action } = req.body;
        return await courseRepository.approveOrRejectVideo(courseId, action);
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.approveOrRejectVideo = approveOrRejectVideo;
//# sourceMappingURL=approveOrRejectVideo.js.map