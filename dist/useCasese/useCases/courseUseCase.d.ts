import { Next, Req } from "../../frameworks/types/serverPackageTypes";
import { ICourseCategoryBaseResponse, ICourseResponse } from "../interface/request_And_Response/course";
import { ICloudStorage } from "../interface/services/cloudStorage";
import { ICourseUseCase } from "../interface/useCase/courseUseCase";
import { ICourseRepository } from "../interface/repository/courseRepository";
import { ICloudStorageResponse, IExtendedCloudStorageResponse } from "../interface/request_And_Response/cloudStorageResponse";
import { NextFunction } from "express";
import { ICategoryRepository } from "../interface/repository/categoryRepository";
import { ICategory } from "../../entities/category";
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
import { INotificationRepository } from "../interface/repository/notificationRepository";
import { IConversationRepository } from "../interface/repository/conversation";
export declare class CourseUseCase implements ICourseUseCase {
    private readonly cloudStorage;
    private readonly courseRepository;
    private readonly categoryRepository;
    private readonly paymentService;
    private readonly paymentRepository;
    private readonly userRepository;
    private readonly cloudSesssion;
    private readonly reviewAndRatingRepository;
    private readonly courseTrackingRepository;
    private readonly notificationRepository;
    private readonly conversationRepository;
    constructor(cloudStorage: ICloudStorage, courseRepository: ICourseRepository, categoryRepository: ICategoryRepository, paymentService: IPaymentService, paymentRepository: IPaymentRepository, userRepository: IUserRepository, cloudSesssion: ICloudSession, reviewAndRatingRepository: IReviewAndRatingRepository, courseTrackingRepository: ICourseTrackingRepository, notificationRepository: INotificationRepository, conversationRepository: IConversationRepository);
    getCourseInProgress(req: Req, next: Next): Promise<ICourseResponse | void>;
    addCourseData(req: Req, next: Next): Promise<ICourseResponse | void>;
    addFileToCloud(req: Req, next: Next): Promise<string | void>;
    updateCourse(req: Req, next: Next): Promise<ICourseResponse | void>;
    addModuleVideos(req: Req, next: Next): Promise<ICourseResponse | void>;
    getCourses(req: Req, next: Next): Promise<void | ICourseResponse>;
    getCoursesInRequest(req: Req, next: Next): Promise<void | ICourseResponse>;
    getVideoPresignedUrl(req: Req, next: Next): Promise<void | ICloudStorageResponse>;
    approveOrRejectVideo(req: Req, next: Next): Promise<void | ICourseResponse>;
    getCoursesForUser(req: Req, next: NextFunction): Promise<void | ICourseResponse>;
    getCategories(req: Req, next: NextFunction): Promise<ICategory[] | void>;
    getVideoForUser(req: Req, next: NextFunction): Promise<IExtendedCloudStorageResponse | void>;
    getVideoForVisitors(req: Req, next: NextFunction): Promise<void | ICloudStorageResponse>;
    enrollCourse(req: Req, next: NextFunction): Promise<void | IPaymentRespose>;
    paymentStatus(req: Req, next: NextFunction): Promise<void | IUserResponse>;
    updateReviewAndRating(req: Req, next: NextFunction): Promise<void | IReviewAndRatingResponse>;
    getSingleCourseReviewAndRating(req: Req, next: Next): Promise<void | IReviewAndRatingResponse>;
    getThumbnamilImagePresignedUrl(req: Req, next: NextFunction): Promise<void | ICloudStorageResponse>;
    getUserEnrolledCourses(req: Req, next: Next): Promise<void | ICourseResponse>;
    getCourseByCategory(req: Req, next: NextFunction): Promise<void | ICourseCategoryBaseResponse>;
    getCourseForSearch(req: Req, next: NextFunction): Promise<void | ICourseCategoryBaseResponse>;
    getInstructorTutorials(req: Req, next: NextFunction): Promise<void | ICourseResponse>;
    setVideoTrack(req: Req, next: NextFunction): Promise<void | ICourseTrackResponse>;
}
