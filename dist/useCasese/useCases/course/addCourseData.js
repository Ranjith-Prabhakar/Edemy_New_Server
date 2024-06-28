"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCourseData = void 0;
const catchError_1 = require("../../middlewares/catchError");
const addCourseData = async (courseRepository, userRepository, cloudSesssion, req, next) => {
    try {
        const courseResult = await courseRepository.addCourseData({
            ...req.body,
            instructor: req.user?._id,
            instructorName: req.user?.name,
            price: req.body.price * 1,
        });
        const courseData = courseResult.data;
        const userResult = await userRepository.updateCourses(courseData?._id, req.user?._id);
        if (userResult) {
            await cloudSesssion.createUserSession(userResult._id, userResult);
        }
        return courseResult;
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.addCourseData = addCourseData;
//# sourceMappingURL=addCourseData.js.map