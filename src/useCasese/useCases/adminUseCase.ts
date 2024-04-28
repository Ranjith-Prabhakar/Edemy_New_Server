import { Next, Req } from "../../frameworks/types/serverPackageTypes";
import { ICategoryRepository } from "../interface/repository/categoryRepository";
import { IInstructorAgreementRepository } from "../interface/repository/instructorAgreementRepository";
import { IUserRepository } from "../interface/repository/userRepository";
// import {
//   approveOrRejectInstructor,
//   getUsers,
//   getUser,
//   freezUser,
//   unFreezUser,
//   getInstructors,
//   addCategory,
//   getCategories,
//   freezCategory,
//   unFreezCategory,
//   instructorRequests,
//   getStatistics,
// } from "./admin/index";
import * as adminUseCaseEngine from "./admin/index"
import { IUser } from "../../entities/user";
import { IAdminUseCase } from "../interface/useCase/adminUseCase";
import { ICategory } from "../../entities/category";
import { ICategoryResponse } from "../interface/request_And_Response/category";
import { IUserResponse } from "../interface/request_And_Response/user";
import { IInstructorAgreementResponse } from "../interface/request_And_Response/instructorAgreement";
import { SocketClass } from "../staticClassProperty/StaticClassProperty";
import { INotificationRepository } from "../interface/repository/notificationRepository";
import { ENotification, ENotificationMsg } from "../../entities/notification";
import { catchError } from "../middlewares/catchError";
import { ICloudSession } from "../interface/services/cloudSession";
import { IStatistics } from "../interface/request_And_Response/statistics";
import { ICourseRepository } from "../interface/repository/courseRepository";
import { IReviewAndRatingRepository } from "../interface/repository/reviewAndRatingRepository";

export class AdminUseCase implements IAdminUseCase {
  private readonly userRepository: IUserRepository;
  private readonly instrctorAgreementRepository: IInstructorAgreementRepository;
  private readonly categoryRepository: ICategoryRepository;
  private readonly notificationRepository: INotificationRepository;
  private readonly cloudSession: ICloudSession;
  private readonly courseRepository: ICourseRepository;
  private readonly reviewAndRatingRepository: IReviewAndRatingRepository;
  constructor(
    userRepository: IUserRepository,
    instrctorAgreementRepository: IInstructorAgreementRepository,
    categoryRepository: ICategoryRepository,
    notificationRepository: INotificationRepository,
    cloudSession: ICloudSession,
    courseRepository: ICourseRepository,
    reviewAndRatingRepository: IReviewAndRatingRepository
  ) {
    this.userRepository = userRepository;
    this.instrctorAgreementRepository = instrctorAgreementRepository;
    this.categoryRepository = categoryRepository;
    this.notificationRepository = notificationRepository;
    this.cloudSession = cloudSession;
    this.courseRepository = courseRepository;
    this.reviewAndRatingRepository = reviewAndRatingRepository;
  }
  // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async approveOrRejectInstructor(
    req: Req,
    next: Next
  ): Promise<IInstructorAgreementResponse | void> {
    try {
      const { userId } = req.body;

      const result = (await adminUseCaseEngine.approveOrRejectInstructor(
        this.userRepository,
        this.instrctorAgreementRepository,
        req,
        next
      )) as IInstructorAgreementResponse;
      // have to check whethere approve or not (but not done it now )
      const notificationRepoUpdate =
        await this.notificationRepository.addNotification(
          userId as string,
          result.message === ENotificationMsg.instructorRequestApproval
            ? ENotification.instructorRequestApproval
            : ENotification.instructorRequestRejection
        );

      if (
        notificationRepoUpdate &&
        result.message === ENotificationMsg.instructorRequestApproval
      ) {
        const userSession = (await this.cloudSession.getUser(
          userId as string
        )) as string;
        const parsedUserSession = JSON.parse(userSession);
        parsedUserSession.role = "instructor";
        await this.cloudSession.createUserSession(
          userId as string,
          parsedUserSession
        );
      }
      // -------------------------------------------------------------------------------
      SocketClass.SocketUsers[userId].emit(
        "fromServerInstrctorRequestApproval",
        result.message
      );
      return result;
    } catch (error) {
      catchError(error, next);
    }
  }
  // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async instructorRequests(next: Next): Promise<void | object> {
    try {
      return await adminUseCaseEngine.instructorRequests(
        this.instrctorAgreementRepository,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }

  // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async getUsers(
    req: Req,
    next: Next
  ): Promise<{ permitedNext: number; data: IUser[] } | void> {
    try {
      return await adminUseCaseEngine.getUsers(this.userRepository, req, next);
    } catch (error) {
      catchError(error, next);
    }
  }
  // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async getUser(req: Req, next: Next): Promise<void | IUser> {
    try {
      return await adminUseCaseEngine.getUser(this.userRepository, req, next);
    } catch (error) {
      catchError(error, next);
    }
  }
  // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async freezUser(req: Req, next: Next): Promise<IUserResponse | void> {
    try {
      return adminUseCaseEngine.freezUser(this.userRepository, req, next);
    } catch (error) {
      catchError(error, next);
    }
  }
  // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async unFreezUser(req: Req, next: Next): Promise<IUserResponse | void> {
    try {
      return adminUseCaseEngine.unFreezUser(this.userRepository, req, next);
    } catch (error) {
      catchError(error, next);
    }
  }
  // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async getInstructors(
    req: Req,
    next: Next
  ): Promise<{ permitedNext: number; data: IUser[] } | void> {
    try {
      return await adminUseCaseEngine.getInstructors(
        this.userRepository,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async addCategory(
    req: Req,
    next: Next
  ): Promise<void | {
    success: boolean;
    message: string;
  }> {
    try {
      return await adminUseCaseEngine.addCategory(
        this.categoryRepository,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async getCategories(next: Next): Promise<void | ICategory[]> {
    try {
      return await adminUseCaseEngine.getCategories(
        this.categoryRepository,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async freezCategory(req: Req, next: Next): Promise<ICategoryResponse | void> {
    try {
      return await adminUseCaseEngine.freezCategory(
        req,
        next,
        this.categoryRepository
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async unFreezCategory(
    req: Req,
    next: Next
  ): Promise<ICategoryResponse | void> {
    try {
      return await adminUseCaseEngine.unFreezCategory(
        req,
        next,
        this.categoryRepository
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async getStatistics(next: Next): Promise<void | IStatistics> {
    try {
      return await adminUseCaseEngine.getStatistics(
        this.courseRepository,
        this.categoryRepository,
        this.reviewAndRatingRepository,
        this.userRepository,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  //
}
