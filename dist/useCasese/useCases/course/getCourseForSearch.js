"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseForSearch = void 0;
const catchError_1 = require("../../middlewares/catchError");
const getCourseForSearch = async (courseRepository, req, next) => {
    try {
        const { key, sort, filter } = req.body;
        let { pageNumber, frequency, } = req.body;
        pageNumber = +pageNumber;
        frequency = +frequency;
        return courseRepository.getCourseForSearch(key, pageNumber, frequency, sort, filter);
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.getCourseForSearch = getCourseForSearch;
//# sourceMappingURL=getCourseForSearch.js.map