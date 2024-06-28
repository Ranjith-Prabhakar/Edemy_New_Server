"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseInProgress = void 0;
const catchError_1 = require("../../middlewares/catchError");
const getCourseInProgress = async (courseRepository, req, next) => {
    try {
        return await courseRepository.getCourseInProgress(req.user?._id);
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.getCourseInProgress = getCourseInProgress;
//# sourceMappingURL=getCourseInProgress.js.map