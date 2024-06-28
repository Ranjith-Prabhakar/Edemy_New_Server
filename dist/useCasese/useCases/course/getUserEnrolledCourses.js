"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserEnrolledCourses = void 0;
const catchError_1 = require("../../middlewares/catchError");
const getUserEnrolledCourses = async (courseRepository, req, next) => {
    try {
        return await courseRepository.getUserEnrolledCourses(req.body.courses);
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.getUserEnrolledCourses = getUserEnrolledCourses;
//# sourceMappingURL=getUserEnrolledCourses.js.map