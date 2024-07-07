import { IPayment } from "../../../entities/payment";
import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICategoryRepository } from "../../interface/repository/categoryRepository";
import { IConversationRepository } from "../../interface/repository/conversation";
import { ICourseRepository } from "../../interface/repository/courseRepository";
import { IPaymentRepository } from "../../interface/repository/paymentRepository";
import { IUserRepository } from "../../interface/repository/userRepository";
import { IUserResponse } from "../../interface/request_And_Response/user";
import { ICloudSession } from "../../interface/services/cloudSession";
import { catchError } from "../../middlewares/catchError";
import ErrorHandler from "../../middlewares/errorHandler";

export const paymentStatus = async (
  paymentRepository: IPaymentRepository,
  userRepository: IUserRepository,
  courseRepository: ICourseRepository,
  cloudSession: ICloudSession,
  categoryRepository: ICategoryRepository,
  conversationRepository: IConversationRepository,
  req: Req,
  next: Next
): Promise<void | IUserResponse> => {
  try {
    const courseData = (await paymentRepository.findAndDelete(
      req.user?._id as string
    )) as IPayment;
    if (courseData) {

      const [newUserData, isPurchaseUpdated, isCategoryUpdated] =
        await Promise.all([
          userRepository.addEnrolledCourse(
            courseData.courseId as string,
            req.user?._id as string
          ),
          courseRepository.updatePurchas(courseData.courseId as string),
          categoryRepository.updateCategoryPurchasecount(courseData.category),
        ]);
      if (newUserData && isPurchaseUpdated && isCategoryUpdated) {

        await cloudSession.createUserSession(
          req.user?._id as string,
          newUserData
        );

        
        await conversationRepository.addParticipants(
          courseData.courseId as string,
          req.user?._id as string
        );
        return {
          success: true,
          message: "course has been added to the user collection",
          data: newUserData,
        };
      } else {
        return next(
          new ErrorHandler(400, "please try again,something went wrong!!!")
        );
      }
    }
  } catch (error) {
    catchError(error, next);
  }
};
