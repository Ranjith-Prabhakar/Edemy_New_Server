import { Next, Req } from "../../frameworks/types/serverPackageTypes";
import {
  ICourseCategoryBaseResponse,
  ICourseResponse,
} from "../interface/request_And_Response/course";
import { ICloudStorage } from "../interface/services/cloudStorage";
import { ICourseUseCase } from "../interface/useCase/courseUseCase";

import * as courseUseCaseEngine from "./course/index";
import { ICourseRepository } from "../interface/repository/courseRepository";
import {
  ICloudStorageResponse,
  IExtendedCloudStorageResponse,
} from "../interface/request_And_Response/cloudStorageResponse";
import { NextFunction } from "express";
import { ICategoryRepository } from "../interface/repository/categoryRepository";
import { ICategory } from "../../entities/category";
import { catchError } from "../middlewares/catchError";
import { IPaymentRespose } from "../interface/request_And_Response/payment";
import { IPaymentService } from "../interface/services/paymentService";
import { IPaymentRepository } from "../interface/repository/paymentRepository";
import { IUserResponse } from "../interface/request_And_Response/user";
import { IUserRepository } from "../interface/repository/userRepository";
import { ICloudSession } from "../interface/services/cloudSession";
import { IReviewAndRatingResponse } from "../interface/request_And_Response/reviewAndRatingResponse";
import { IReviewAndRatingRepository } from "../interface/repository/reviewAndRatingRepository";
import { ICourseTrackResponse } from "../interface/request_And_Response/courseTrack";
import { ICourseTrackingRepository } from "../interface/repository/courseTrackingRepository";
import { SocketClass } from "../staticClassProperty/StaticClassProperty";
import { INotificationRepository } from "../interface/repository/notificationRepository";
import { ENotification, ENotificationMsg } from "../../entities/notification";
import { ICourse } from "../../entities/course";
import { IConversationRepository } from "../interface/repository/conversation";

export class CourseUseCase implements ICourseUseCase {
  private readonly cloudStorage: ICloudStorage;
  private readonly courseRepository: ICourseRepository;
  private readonly categoryRepository: ICategoryRepository;
  private readonly paymentService: IPaymentService;
  private readonly paymentRepository: IPaymentRepository;
  private readonly userRepository: IUserRepository;
  private readonly cloudSesssion: ICloudSession;
  private readonly reviewAndRatingRepository: IReviewAndRatingRepository;
  private readonly courseTrackingRepository: ICourseTrackingRepository;
  private readonly notificationRepository: INotificationRepository;
  private readonly conversationRepository: IConversationRepository;
  constructor(
    cloudStorage: ICloudStorage,
    courseRepository: ICourseRepository,
    categoryRepository: ICategoryRepository,
    paymentService: IPaymentService,
    paymentRepository: IPaymentRepository,
    userRepository: IUserRepository,
    cloudSesssion: ICloudSession,
    reviewAndRatingRepository: IReviewAndRatingRepository,
    courseTrackingRepository: ICourseTrackingRepository,
    notificationRepository: INotificationRepository,
    conversationRepository: IConversationRepository
  ) {
    this.cloudStorage = cloudStorage;
    this.courseRepository = courseRepository;
    this.categoryRepository = categoryRepository;
    this.paymentService = paymentService;
    this.paymentRepository = paymentRepository;
    this.userRepository = userRepository;
    this.cloudSesssion = cloudSesssion;
    this.reviewAndRatingRepository = reviewAndRatingRepository;
    this.courseTrackingRepository = courseTrackingRepository;
    this.notificationRepository = notificationRepository;
    this.conversationRepository = conversationRepository;
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async getCourseInProgress(
    req: Req,
    next: Next
  ): Promise<ICourseResponse | void> {
    try {
      return await courseUseCaseEngine.getCourseInProgress(
        this.courseRepository,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async addCourseData(req: Req, next: Next): Promise<ICourseResponse | void> {
    try {
      return await courseUseCaseEngine.addCourseData(
        this.courseRepository,
        this.userRepository,
        this.cloudSesssion,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async addFileToCloud(req: Req, next: Next): Promise<string | void> {
    try {
      return await courseUseCaseEngine.addFileToCloud(
        this.cloudStorage,
        this.courseRepository,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async updateCourse(req: Req, next: Next): Promise<ICourseResponse | void> {
    try {
      return await courseUseCaseEngine.updateCourse(
        this.courseRepository,
        this.userRepository,
        this.notificationRepository,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async addModuleVideos(req: Req, next: Next): Promise<ICourseResponse | void> {
    try {
      return await courseUseCaseEngine.addModuleVideos(
        this.courseRepository,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }

  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async getCourses(req: Req, next: Next): Promise<void | ICourseResponse> {
    try {
      return await courseUseCaseEngine.getCourses(this.courseRepository, next);
    } catch (error) {
      catchError(error, next);
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async getCoursesInRequest(
    req: Req,
    next: Next
  ): Promise<void | ICourseResponse> {
    try {
      return await courseUseCaseEngine.getCoursesInRequest(
        this.courseRepository,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async getVideoPresignedUrl(
    req: Req,
    next: Next
  ): Promise<void | ICloudStorageResponse> {
    try {
      return await courseUseCaseEngine.getVideoPresignedUrl(
        this.cloudStorage,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async approveOrRejectVideo(
    req: Req,
    next: Next
  ): Promise<void | ICourseResponse> {
    try {
      const result = await courseUseCaseEngine.approveOrRejectVideo(
        this.courseRepository,
        req,
        next
      );
      // adding admin and instructor into the conversation
      const resultData = result?.data as ICourse;
      const instructorId = resultData.instructor;
      const adminId = req.user?._id as string;
      const courseId = resultData._id as string;
      Promise.all([
        await this.conversationRepository.addParticipants(courseId, adminId),
        await this.conversationRepository.addParticipants(
          courseId,
          instructorId
        ),
      ]);

      const notificationRepoUpdate =
        await this.notificationRepository.addNotification(
          req.body.instructorId as string,
          ENotification.courseApprovalApprovance
        );
      if (notificationRepoUpdate) {
        const instructorMessage =
          (result?.data as ICourse).status === "approved"
            ? ENotificationMsg.courseApprovalApprovance
            : ENotificationMsg.courseApprovalRejection;
        //sending notification to the instructor
        SocketClass.SocketUsers[req.body.instructorId].emit(
          "fromServerCourseApproved",
          instructorMessage
        );

        if ((result?.data as ICourse).status === "approved") {
          // sendin notification to all online users except instructor
          const usersExceptInstructor = SocketClass.SocketUsers;
          delete usersExceptInstructor[req.body.instructorId];
          delete usersExceptInstructor[req.user?._id as string];

          const activeUsers = Object.values(usersExceptInstructor);
          activeUsers.forEach((user) =>
            user.emit(
              "fromServerCourseApprovedNotificationForAllUsers",
              ENotificationMsg.courseApprovalApprovanceForAllUsers
            )
          );
        }
      }

      return result;
    } catch (error) {
      catchError(error, next);
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async getCoursesForUser(
    req: Req,
    next: NextFunction
  ): Promise<void | ICourseResponse> {
    try {
      return await courseUseCaseEngine.getCoursesForUser(
        this.courseRepository,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888

  async getCategories(
    req: Req,
    next: NextFunction
  ): Promise<ICategory[] | void> {
    try {
      return await courseUseCaseEngine.getCategories(
        this.categoryRepository,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }

  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async getVideoForUser(
    req: Req,
    next: NextFunction
  ): Promise<IExtendedCloudStorageResponse | void> {
    try {
      return await courseUseCaseEngine.getVideoForUser(
        this.courseRepository,
        this.cloudStorage,
        this.courseTrackingRepository,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888

  async getVideoForVisitors(
    req: Req,
    next: NextFunction
  ): Promise<void | ICloudStorageResponse> {
    try {
      return await courseUseCaseEngine.getVideoForVisitors(
        this.courseRepository,
        this.cloudStorage,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async enrollCourse(
    req: Req,
    next: NextFunction
  ): Promise<void | IPaymentRespose> {
    try {
      return await courseUseCaseEngine.enrollCourse(
        this.paymentService,
        this.paymentRepository,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async paymentStatus(
    req: Req,
    next: NextFunction
  ): Promise<void | IUserResponse> {
    try {
      return await courseUseCaseEngine.paymentStatus(
        this.paymentRepository,
        this.userRepository,
        this.courseRepository,
        this.cloudSesssion,
        this.categoryRepository,
        this.conversationRepository,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async updateReviewAndRating(
    req: Req,
    next: NextFunction
  ): Promise<void | IReviewAndRatingResponse> {
    try {
      return await courseUseCaseEngine.updateReviewAndRating(
        this.reviewAndRatingRepository,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888;
  async getSingleCourseReviewAndRating(
    req: Req,
    next: Next
  ): Promise<void | IReviewAndRatingResponse> {
    try {
      return await courseUseCaseEngine.getSingleCourseReviewAndRating(
        this.reviewAndRatingRepository,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888;
  async getThumbnamilImagePresignedUrl(
    req: Req,
    next: NextFunction
  ): Promise<void | ICloudStorageResponse> {
    try {
      return await courseUseCaseEngine.getThumbnamilImagePresignedUrl(
        this.cloudStorage,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888;
  async getUserEnrolledCourses(
    req: Req,
    next: Next
  ): Promise<void | ICourseResponse> {
    try {
      return await courseUseCaseEngine.getUserEnrolledCourses(
        this.courseRepository,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }

  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888;
  async getCourseByCategory(
    req: Req,
    next: NextFunction
  ): Promise<void | ICourseCategoryBaseResponse> {
    try {
      return await courseUseCaseEngine.getCourseByCategory(
        this.courseRepository,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888;
  async getCourseForSearch(
    req: Req,
    next: NextFunction
  ): Promise<void | ICourseCategoryBaseResponse> {
    try {
      const result = await courseUseCaseEngine.getCourseForSearch(
        this.courseRepository,
        req,
        next
      );
      return result;
    } catch (error) {
      catchError(error, next);
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888;
  async getInstructorTutorials(
    req: Req,
    next: NextFunction
  ): Promise<void | ICourseResponse> {
    try {
      return await courseUseCaseEngine.getInstructorTutorials(
        this.courseRepository,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888;
  async setVideoTrack(
    req: Req,
    next: NextFunction
  ): Promise<void | ICourseTrackResponse> {
    try {
      return await courseUseCaseEngine.setVideoTrack(
        this.courseTrackingRepository,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
}
