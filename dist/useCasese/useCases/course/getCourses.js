"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourses = void 0;
const catchError_1 = require("../../middlewares/catchError");
const getCourses = async (courseRepository, next) => {
    try {
        return await courseRepository.getCourses();
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.getCourses = getCourses;
//# sourceMappingURL=getCourses.js.map