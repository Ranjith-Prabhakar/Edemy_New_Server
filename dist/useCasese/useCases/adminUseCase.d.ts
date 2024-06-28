import { Next, Req } from "../../frameworks/types/serverPackageTypes";
import { ICategoryRepository } from "../interface/repository/categoryRepository";
import { IInstructorAgreementRepository } from "../interface/repository/instructorAgreementRepository";
import { IUserRepository } from "../interface/repository/userRepository";
import { IUser } from "../../entities/user";
import { IAdminUseCase } from "../interface/useCase/adminUseCase";
import { ICategory } from "../../entities/category";
import { ICategoryResponse } from "../interface/request_And_Response/category";
import { IUserResponse } from "../interface/request_And_Response/user";
import { IInstructorAgreementResponse } from "../interface/request_And_Response/instructorAgreement";
import { INotificationRepository } from "../interface/repository/notificationRepository";
import { ICloudSession } from "../interface/services/cloudSession";
import { IStatistics } from "../interface/request_And_Response/statistics";
import { ICourseRepository } from "../interface/repository/courseRepository";
import { IReviewAndRatingRepository } from "../interface/repository/reviewAndRatingRepository";
export declare class AdminUseCase implements IAdminUseCase {
    private readonly userRepository;
    private readonly instrctorAgreementRepository;
    private readonly categoryRepository;
    private readonly notificationRepository;
    private readonly cloudSession;
    private readonly courseRepository;
    private readonly reviewAndRatingRepository;
    constructor(userRepository: IUserRepository, instrctorAgreementRepository: IInstructorAgreementRepository, categoryRepository: ICategoryRepository, notificationRepository: INotificationRepository, cloudSession: ICloudSession, courseRepository: ICourseRepository, reviewAndRatingRepository: IReviewAndRatingRepository);
    approveOrRejectInstructor(req: Req, next: Next): Promise<IInstructorAgreementResponse | void>;
    instructorRequests(next: Next): Promise<void | object>;
    getUsers(req: Req, next: Next): Promise<{
        permitedNext: number;
        data: IUser[];
    } | void>;
    getUser(req: Req, next: Next): Promise<void | IUser>;
    freezUser(req: Req, next: Next): Promise<IUserResponse | void>;
    unFreezUser(req: Req, next: Next): Promise<IUserResponse | void>;
    getInstructors(req: Req, next: Next): Promise<{
        permitedNext: number;
        data: IUser[];
    } | void>;
    addCategory(req: Req, next: Next): Promise<void | {
        success: boolean;
        message: string;
    }>;
    getCategories(next: Next): Promise<void | ICategory[]>;
    freezCategory(req: Req, next: Next): Promise<ICategoryResponse | void>;
    unFreezCategory(req: Req, next: Next): Promise<ICategoryResponse | void>;
    getStatistics(next: Next): Promise<void | IStatistics>;
}
