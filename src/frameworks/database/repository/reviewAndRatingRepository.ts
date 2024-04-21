import mongoose from "mongoose";
import { IReviewAndRating } from "../../../entities/reviewAndRating";
import { IReviewAndRatingRepository } from "../../../useCasese/interface/repository/reviewAndRatingRepository";
import {
  IReviewAndRatingReq,
  IReviewAndRatingResponse,
} from "../../../useCasese/interface/request_And_Response/reviewAndRatingResponse";
import reviewAndRatingModel from "../models/reviewAndRatingModel";
import { IRatingAndNoOfCourses } from "../../../useCasese/interface/request_And_Response/statistics";

export class ReviewAndRatingRepository implements IReviewAndRatingRepository {
  async updateReviewAndRating(
    reviewAndRating: IReviewAndRatingReq
  ): Promise<void | IReviewAndRatingResponse> {
    try {
      //check whether the course is already in this collection
      const isExist = await reviewAndRatingModel.findOne({
        courseId: reviewAndRating.courseId,
      });
      if (isExist) {
        //check whether the user alrady made any rating or review then we will update it
        const isUserAlreadyAddedReview = await reviewAndRatingModel.findOne({
          courseId: reviewAndRating.courseId,
          reviewAndRating: {
            $elemMatch: { userId: reviewAndRating.reviewAndRating.userId },
          },
        });
        if (isUserAlreadyAddedReview) {
          // check whether he has to update the review
          if (reviewAndRating.reviewAndRating.review) {
            const updatedReviewAndRating =
              await reviewAndRatingModel.findOneAndUpdate(
                {
                  courseId: reviewAndRating.courseId,
                  "reviewAndRating.userId":
                    reviewAndRating.reviewAndRating.userId,
                },
                {
                  $set: {
                    "reviewAndRating.$.review":
                      reviewAndRating.reviewAndRating.review,
                  },
                },
                { returnDocument: "after" }
              );
            return {
              success: true,
              message: "new review and rating repo has been created",
              data: updatedReviewAndRating as unknown as IReviewAndRating[],
            };
          }
          // check whether he has to update the rating
          else if (reviewAndRating.reviewAndRating.rating) {
            const updatedReviewAndRating =
              await reviewAndRatingModel.findOneAndUpdate(
                {
                  courseId: reviewAndRating.courseId,
                  "reviewAndRating.userId":
                    reviewAndRating.reviewAndRating.userId,
                },
                {
                  $set: {
                    "reviewAndRating.$.rating":
                      reviewAndRating.reviewAndRating.rating,
                  },
                },
                { returnDocument: "after" }
              );
            return {
              success: true,
              message: "new review and rating repo has been created",
              data: updatedReviewAndRating as unknown as IReviewAndRating[],
            };
          }
        } else {
          // if the user made neither rating or review
          const updatedReviewAndRating =
            await reviewAndRatingModel.findOneAndUpdate(
              { courseId: reviewAndRating.courseId },
              {
                $addToSet: { reviewAndRating: reviewAndRating.reviewAndRating },
              },
              { returnDocument: "after" }
            );
          return {
            success: true,
            message: "new review and rating repo has been created",
            data: updatedReviewAndRating as unknown as IReviewAndRating[],
          };
        }
      } else {
        // if the course is not added already
        const newReviewAndRating = await reviewAndRatingModel.create(
          reviewAndRating
        );

        return {
          success: true,
          message: "new review and rating repo has been created",
          data: newReviewAndRating as unknown as IReviewAndRating[],
        };
      }
    } catch (error) {
      throw error;
    }
  }

  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async getSingleCourseReviewAndRating(
    courseId: string
  ): Promise<void | IReviewAndRatingResponse> {
    try {
      const objectId = mongoose.Types.ObjectId.createFromHexString(courseId); // Using mongoose.Types.ObjectId.createFromHexString()
      const result = await reviewAndRatingModel.findOne({ courseId: objectId });
      if (result) {
        return {
          success: true,
          message: "Review and ratings are fetched",
          data: result,
        };
      } else {
        return {
          success: false,
          message: "No review and ratings found for the provided courseId",
        };
      }
    } catch (error) {
      throw error;
    }
  }
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async ratingAndNoOfCourses_Statistics(): Promise<void | IRatingAndNoOfCourses> {
    try {
      const result = await reviewAndRatingModel.aggregate([
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

      return result as unknown as  IRatingAndNoOfCourses;
    } catch (error) {
      throw error;
    }
  }
}
