"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewAndRatingRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const reviewAndRatingModel_1 = __importDefault(require("../models/reviewAndRatingModel"));
class ReviewAndRatingRepository {
    async updateReviewAndRating(reviewAndRating) {
        try {
            //check whether the course is already in this collection
            const isExist = await reviewAndRatingModel_1.default.findOne({
                courseId: reviewAndRating.courseId,
            });
            if (isExist) {
                //check whether the user alrady made any rating or review then we will update it
                const isUserAlreadyAddedReview = await reviewAndRatingModel_1.default.findOne({
                    courseId: reviewAndRating.courseId,
                    reviewAndRating: {
                        $elemMatch: { userId: reviewAndRating.reviewAndRating.userId },
                    },
                });
                if (isUserAlreadyAddedReview) {
                    // check whether he has to update the review
                    if (reviewAndRating.reviewAndRating.review) {
                        const updatedReviewAndRating = await reviewAndRatingModel_1.default.findOneAndUpdate({
                            courseId: reviewAndRating.courseId,
                            "reviewAndRating.userId": reviewAndRating.reviewAndRating.userId,
                        }, {
                            $set: {
                                "reviewAndRating.$.review": reviewAndRating.reviewAndRating.review,
                            },
                        }, { returnDocument: "after" });
                        return {
                            success: true,
                            message: "new review and rating repo has been created",
                            data: updatedReviewAndRating,
                        };
                    }
                    // check whether he has to update the rating
                    else if (reviewAndRating.reviewAndRating.rating) {
                        const updatedReviewAndRating = await reviewAndRatingModel_1.default.findOneAndUpdate({
                            courseId: reviewAndRating.courseId,
                            "reviewAndRating.userId": reviewAndRating.reviewAndRating.userId,
                        }, {
                            $set: {
                                "reviewAndRating.$.rating": reviewAndRating.reviewAndRating.rating,
                            },
                        }, { returnDocument: "after" });
                        return {
                            success: true,
                            message: "new review and rating repo has been created",
                            data: updatedReviewAndRating,
                        };
                    }
                }
                else {
                    // if the user made neither rating or review
                    const updatedReviewAndRating = await reviewAndRatingModel_1.default.findOneAndUpdate({ courseId: reviewAndRating.courseId }, {
                        $addToSet: { reviewAndRating: reviewAndRating.reviewAndRating },
                    }, { returnDocument: "after" });
                    return {
                        success: true,
                        message: "new review and rating repo has been created",
                        data: updatedReviewAndRating,
                    };
                }
            }
            else {
                // if the course is not added already
                const newReviewAndRating = await reviewAndRatingModel_1.default.create(reviewAndRating);
                return {
                    success: true,
                    message: "new review and rating repo has been created",
                    data: newReviewAndRating,
                };
            }
        }
        catch (error) {
            throw error;
        }
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async getSingleCourseReviewAndRating(courseId) {
        try {
            const objectId = mongoose_1.default.Types.ObjectId.createFromHexString(courseId); // Using mongoose.Types.ObjectId.createFromHexString()
            const result = await reviewAndRatingModel_1.default.findOne({ courseId: objectId });
            if (result) {
                return {
                    success: true,
                    message: "Review and ratings are fetched",
                    data: result,
                };
            }
            else {
                return {
                    success: false,
                    message: "No review and ratings found for the provided courseId",
                };
            }
        }
        catch (error) {
            throw error;
        }
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async ratingAndNoOfCourses_Statistics() {
        try {
            const result = await reviewAndRatingModel_1.default.aggregate([
                {
                    $project: {
                        courseId: 1,
                        courseName: 1,
                        averageRating: { $avg: "$reviewAndRating.rating" }, // Calculate the average rating for each document
                    },
                },
                {
                    $group: {
                        _id: null,
                        count: { $sum: 1 },
                        ratingRange_4_5: {
                            $sum: { $cond: [{ $gte: ["$averageRating", 4] }, 1, 0] },
                        },
                        ratingRange_3_4: {
                            $sum: {
                                $cond: [
                                    { $gte: ["$averageRating", 3] },
                                    { $cond: [{ $lt: ["$averageRating", 4] }, 1, 0] },
                                    0,
                                ],
                            },
                        },
                        ratingRange_2_3: {
                            $sum: {
                                $cond: [
                                    { $gte: ["$averageRating", 2] },
                                    { $cond: [{ $lt: ["$averageRating", 3] }, 1, 0] },
                                    0,
                                ],
                            },
                        },
                        ratingRange_1_2: {
                            $sum: {
                                $cond: [
                                    { $gte: ["$averageRating", 1] },
                                    { $cond: [{ $lt: ["$averageRating", 2] }, 1, 0] },
                                    0,
                                ],
                            },
                        },
                        ratingRange_0_1: {
                            $sum: { $cond: [{ $lt: ["$averageRating", 1] }, 1, 0] },
                        },
                    },
                },
            ]);
            return result;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ReviewAndRatingRepository = ReviewAndRatingRepository;
//# sourceMappingURL=reviewAndRatingRepository.js.map