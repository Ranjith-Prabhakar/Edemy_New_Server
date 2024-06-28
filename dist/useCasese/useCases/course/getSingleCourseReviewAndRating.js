"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleCourseReviewAndRating = void 0;
const catchError_1 = require("../../middlewares/catchError");
const getSingleCourseReviewAndRating = async (reviewAndRatingRepository, req, next) => {
    try {
        return await reviewAndRatingRepository.getSingleCourseReviewAndRating(req.body.courseId);
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.getSingleCourseReviewAndRating = getSingleCourseReviewAndRating;
//# sourceMappingURL=getSingleCourseReviewAndRating.js.map