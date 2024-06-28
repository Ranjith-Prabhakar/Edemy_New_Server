"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseByCategory = void 0;
const catchError_1 = require("../../middlewares/catchError");
const getCourseByCategory = async (courseRepository, req, next) => {
    try {
        const { category, sort, filter } = req.body;
        let { pageNumber, frequency } = req.body;
        pageNumber = +pageNumber;
        frequency = +frequency;
        return await courseRepository.getCourseByCategory(category, pageNumber, frequency, sort, filter);
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.getCourseByCategory = getCourseByCategory;
//# sourceMappingURL=getCourseByCategory.js.map