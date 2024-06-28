"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateReviewAndRating = void 0;
const catchError_1 = require("../../middlewares/catchError");
const updateReviewAndRating = async (reviewAndRatingRepository, req, next) => {
    try {
        const reviewAndRating = {
            courseId: req.body.courseId,
            courseName: req.body.courseName,
            reviewAndRating: {
                userId: req.user?._id,
                userName: req.user?.name,
                [req.body.fieldToUpdate]: req.body[req.body.fieldToUpdate],
            },
        };
        const result = await reviewAndRatingRepository.updateReviewAndRating(reviewAndRating);
        return result;
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.updateReviewAndRating = updateReviewAndRating;
//# sourceMappingURL=updateReviewAndRating.js.map