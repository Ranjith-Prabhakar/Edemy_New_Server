import { Req, Res, Next } from "../../frameworks/types/serverPackageTypes";
import { IUserRepository } from "../interface/repository/userRepository";
import { IHashpassword } from "../interface/services/hashPassword";
import { ICreateOtp } from "../interface/services/createOtp";
import { ISendMail } from "../interface/services/sendMail";
import { IOtpRepository } from "../interface/repository/otpRepository";
import { ICloudSession } from "../interface/services/cloudSession";
import { IRequestManagement } from "../interface/services/requestManagement";
import { IJwt, IToken } from "../interface/services/jwt.types";
import { IInstructorAgreementRepository } from "../interface/repository/instructorAgreementRepository";
import { IUserUseCase } from "../interface/useCase/userUseCase";
import { IUser } from "../../entities/user";
import { IJsonResponse } from "../interface/services/jsonResponse";
import { IGeneralResponse } from "../interface/request_And_Response/generalResponse";
import { INotificationRepository } from "../interface/repository/notificationRepository";
import { INotificationResponse } from "../interface/request_And_Response/notification";
import { IAuthService } from "../interface/services/AuthService";
import { IConversationRepository } from "../interface/repository/conversation";
export declare class UserUsecase implements IUserUseCase {
    private readonly userRepository;
    private readonly bcrypt;
    private readonly otpGenerator;
    private readonly sendMail;
    private readonly otpRepository;
    private readonly jwtToken;
    private readonly cloudSession;
    private readonly requestManagement;
    private readonly instructorAgreementRepository;
    private readonly notificationRepository;
    private readonly authService;
    private readonly conversationRepository;
    constructor(userRepository: IUserRepository, bcrypt: IHashpassword, otpGenerator: ICreateOtp, sendMail: ISendMail, otpRepository: IOtpRepository, jwtToken: IJwt, cloudSession: ICloudSession, requestManagement: IRequestManagement, instructorAgreementRepository: IInstructorAgreementRepository, notificationRepository: INotificationRepository, authService: IAuthService, conversationRepository: IConversationRepository);
    registerUser({ name, email, password, }: {
        name: string;
        email: string;
        password: string;
    }, next: Next): Promise<string | void>;
    createUser(verificationCode: string, token: string, next: Next): Promise<IUser | void>;
    login({ email, password }: {
        email: string;
        password: string;
    }, next: Next): Promise<{
        user: IUser;
        tokens: IToken;
    } | void>;
    logout(req: Req, res: Res, next: Next): Promise<void>;
    refresh(req: Req, res: Res, next: Next): Promise<IToken | void>;
    beInstructor(req: Req, next: Next): Promise<IJsonResponse | void>;
    forgotPassword(req: Req, next: Next): Promise<string | void>;
    forgotPasswordOtpVerification(req: Req, next: Next, token: string): Promise<IGeneralResponse | void>;
    resetForgotPassword(req: Req, token: string, next: Next): Promise<IGeneralResponse | void>;
    userSession(req: Req, next: Next): Promise<IUser | void>;
    getNotifications(req: Req, next: Next): Promise<void | INotificationResponse>;
    updateNotifications(req: Req, next: Next): Promise<void | {
        success: boolean;
        message: string;
    }>;
    gAuthUrl(req: Req, next: Next): Promise<void | string>;
    gAuth(req: Req, next: Next): Promise<{
        user: IUser;
        tokens: IToken;
    } | void>;
    resendOtp(req: Req, next: Next): Promise<{
        success: boolean;
        message: string;
    } | void>;
}
