"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstructorTutorials = void 0;
const catchError_1 = require("../../middlewares/catchError");
const getInstructorTutorials = async (courseRepository, req, next) => {
    try {
        return await courseRepository.getInstructorTutorials(req.body.courses);
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.getInstructorTutorials = getInstructorTutorials;
//# sourceMappingURL=getInstructorTutorials.js.map