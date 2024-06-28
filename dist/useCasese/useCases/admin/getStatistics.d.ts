import { Next } from "../../../frameworks/types/serverPackageTypes";
import { ICategoryRepository } from "../../interface/repository/categoryRepository";
import { ICourseRepository } from "../../interface/repository/courseRepository";
import { IReviewAndRatingRepository } from "../../interface/repository/reviewAndRatingRepository";
import { IUserRepository } from "../../interface/repository/userRepository";
import { IStatistics } from "../../interface/request_And_Response/statistics";
export declare const getStatistics: (courseRepository: ICourseRepository, categoryRepository: ICategoryRepository, reviewAndRatingRepository: IReviewAndRatingRepository, userRepository: IUserRepository, next: Next) => Promise<void | IStatistics>;
