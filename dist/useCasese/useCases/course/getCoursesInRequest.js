"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoursesInRequest = void 0;
const catchError_1 = require("../../middlewares/catchError");
const getCoursesInRequest = async (courseRepository, next) => {
    try {
        return await courseRepository.getCoursesInRequest();
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.getCoursesInRequest = getCoursesInRequest;
//# sourceMappingURL=getCoursesInRequest.js.map