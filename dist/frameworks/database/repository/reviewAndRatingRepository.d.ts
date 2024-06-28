import { IReviewAndRatingRepository } from "../../../useCasese/interface/repository/reviewAndRatingRepository";
import { IReviewAndRatingReq, IReviewAndRatingResponse } from "../../../useCasese/interface/request_And_Response/reviewAndRatingResponse";
import { IRatingAndNoOfCourses } from "../../../useCasese/interface/request_And_Response/statistics";
export declare class ReviewAndRatingRepository implements IReviewAndRatingRepository {
    updateReviewAndRating(reviewAndRating: IReviewAndRatingReq): Promise<void | IReviewAndRatingResponse>;
    getSingleCourseReviewAndRating(courseId: string): Promise<void | IReviewAndRatingResponse>;
    ratingAndNoOfCourses_Statistics(): Promise<void | IRatingAndNoOfCourses>;
}
