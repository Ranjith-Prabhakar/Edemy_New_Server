import { Next } from "../../../frameworks/types/serverPackageTypes";
import { ICategoryRepository } from "../../interface/repository/categoryRepository";
import { ICourseRepository } from "../../interface/repository/courseRepository";
import { IReviewAndRatingRepository } from "../../interface/repository/reviewAndRatingRepository";
import { IUserRepository } from "../../interface/repository/userRepository";
import {
  IRatingAndNoOfCourses,
  IStatistics,
  TMonthlySaleAndRevenue,
  TTopSellingCategories,
  TTopTenInstructorAndNoOfCourses,
} from "../../interface/request_And_Response/statistics";
import { catchError } from "../../middlewares/catchError";

export const getStatistics = async (
  courseRepository: ICourseRepository,
  categoryRepository: ICategoryRepository,
  reviewAndRatingRepository: IReviewAndRatingRepository,
  userRepository: IUserRepository,
  next: Next
): Promise<void | IStatistics> => {
  try {
    const [
      monthlySaleAndRevenue,
      topSellingCategories,
      ratingAndNoOfCourses,
      topTenInstructorAndNoOfCourses,
    ] = await Promise.all([
      courseRepository.monthlySaleAndRevenue_Statistics(),
      categoryRepository.topSellingCategories_Statistics(),
      reviewAndRatingRepository.ratingAndNoOfCourses_Statistics(),
      userRepository.topTenInstructorAndNoOfCourses_Statistics(),
    ]);
    
    return {
      status: 200,
      message: "statistics has been found",
      data:{
        monthlySaleAndRevenue:
          monthlySaleAndRevenue as unknown as TMonthlySaleAndRevenue,
        topSellingCategories:
          topSellingCategories as unknown as TTopSellingCategories,
        ratingAndNoOfCourses:
          ratingAndNoOfCourses as unknown as IRatingAndNoOfCourses,
        topTenInstructorAndNoOfCourses:
          topTenInstructorAndNoOfCourses as unknown as TTopTenInstructorAndNoOfCourses,
      },
    };
  } catch (error) {
    catchError(error, next);
  }
};
