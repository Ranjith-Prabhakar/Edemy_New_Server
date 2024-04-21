import {
  IReviewAndRatingReq,
  IReviewAndRatingResponse,
} from "../request_And_Response/reviewAndRatingResponse";
import { IRatingAndNoOfCourses } from "../request_And_Response/statistics";

export interface IReviewAndRatingRepository {
  updateReviewAndRating(
    reviewAndRating: IReviewAndRatingReq
  ): Promise<IReviewAndRatingResponse | void>;
  getSingleCourseReviewAndRating(
    courseId: string
  ): Promise<IReviewAndRatingResponse | void>;
  ratingAndNoOfCourses_Statistics(): Promise<IRatingAndNoOfCourses | void>;
}
