"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoursesForUser = void 0;
const catchError_1 = require("../../middlewares/catchError");
const getCoursesForUser = async (courseRepository, req, next) => {
    try {
        return await courseRepository.getCoursesForUser();
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.getCoursesForUser = getCoursesForUser;
//# sourceMappingURL=getCoursesForUser.js.map