"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatistics = void 0;
const catchError_1 = require("../../middlewares/catchError");
const getStatistics = async (courseRepository, categoryRepository, reviewAndRatingRepository, userRepository, next) => {
    try {
        const [monthlySaleAndRevenue, topSellingCategories, ratingAndNoOfCourses, topTenInstructorAndNoOfCourses,] = await Promise.all([
            courseRepository.monthlySaleAndRevenue_Statistics(),
            categoryRepository.topSellingCategories_Statistics(),
            reviewAndRatingRepository.ratingAndNoOfCourses_Statistics(),
            userRepository.topTenInstructorAndNoOfCourses_Statistics(),
        ]);
        return {
            status: 200,
            message: "statistics has been found",
            data: {
                monthlySaleAndRevenue: monthlySaleAndRevenue,
                topSellingCategories: topSellingCategories,
                ratingAndNoOfCourses: ratingAndNoOfCourses,
                topTenInstructorAndNoOfCourses: topTenInstructorAndNoOfCourses,
            },
        };
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.getStatistics = getStatistics;
//# sourceMappingURL=getStatistics.js.map