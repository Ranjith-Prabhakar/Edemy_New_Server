import { Req, Res, Next } from "../../frameworks/types/serverPackageTypes";
import { IUserRepository } from "../interface/repository/userRepository";
import { IHashpassword } from "../interface/services/hashPassword";
import { ICreateOtp } from "../interface/services/createOtp";
import { ISendMail } from "../interface/services/sendMail";
import { IOtpRepository } from "../interface/repository/otpRepository";
import { ICloudSession } from "../interface/services/cloudSession";
import { IRequestManagement } from "../interface/services/requestManagement";
import { IJwt, IToken } from "../interface/services/jwt.types";
//
import { SocketClass } from "../staticClassProperty/StaticClassProperty";
import * as userUseCaseEngine from "./user/index";
import { IInstructorAgreementRepository } from "../interface/repository/instructorAgreementRepository";
import { IUserUseCase } from "../interface/useCase/userUseCase";
import { IUser } from "../../entities/user";
import { IJsonResponse } from "../interface/services/jsonResponse";
import { IGeneralResponse } from "../interface/request_And_Response/generalResponse";
import { catchError } from "../middlewares/catchError";
import { INotificationRepository } from "../interface/repository/notificationRepository";
import { INotificationResponse } from "../interface/request_And_Response/notification";
import { IAuthService } from "../interface/services/AuthService";
import { IConversationRepository } from "../interface/repository/conversation";
import { TOnlinerUsersIdForLogout } from "../interface/request_And_Response/chat";

export class UserUsecase implements IUserUseCase {
  private readonly userRepository: IUserRepository;
  private readonly bcrypt: IHashpassword;
  private readonly otpGenerator: ICreateOtp;
  private readonly sendMail: ISendMail;
  private readonly otpRepository: IOtpRepository;
  private readonly jwtToken: IJwt;
  private readonly cloudSession: ICloudSession;
  private readonly requestManagement: IRequestManagement;
  private readonly instructorAgreementRepository: IInstructorAgreementRepository;
  private readonly notificationRepository: INotificationRepository;
  private readonly authService: IAuthService;
  private readonly conversationRepository: IConversationRepository;

  //
  constructor(
    userRepository: IUserRepository,
    bcrypt: IHashpassword,
    otpGenerator: ICreateOtp,
    sendMail: ISendMail,
    otpRepository: IOtpRepository,
    jwtToken: IJwt,
    cloudSession: ICloudSession,
    requestManagement: IRequestManagement,
    instructorAgreementRepository: IInstructorAgreementRepository,
    notificationRepository: INotificationRepository,
    authService: IAuthService,
    conversationRepository: IConversationRepository
  ) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
    this.otpGenerator = otpGenerator;
    this.sendMail = sendMail;
    this.otpRepository = otpRepository;
    this.jwtToken = jwtToken;
    this.cloudSession = cloudSession;
    this.requestManagement = requestManagement;
    this.instructorAgreementRepository = instructorAgreementRepository;
    this.notificationRepository = notificationRepository;
    this.authService = authService;
    this.conversationRepository = conversationRepository;
  }
  // **************************************************************************************
  async registerUser(
    {
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    },
    next: Next
  ): Promise<string | void> {
    try {
      const result = await userUseCaseEngine.registerUser(
        this.otpRepository,
        this.userRepository,
        this.sendMail,
        this.otpGenerator,
        this.jwtToken,
        this.bcrypt,
        email,
        name,
        password,
        next
      );
      return result;
    } catch (error: unknown) {
      catchError(error, next);
    }
  }
  // **************************************************************************************
  async createUser(
    verificationCode: string,
    token: string,
    next: Next
  ): Promise<IUser | void> {
    try {
      return await userUseCaseEngine.createUser(
        this.userRepository,
        this.otpRepository,
        this.jwtToken,
        verificationCode,
        token,
        next
      );
    } catch (error: unknown) {
      catchError(error, next);
    }
  }
  // **************************************************************************************
  async login(
    { email, password }: { email: string; password: string },
    next: Next
  ): Promise<{ user: IUser; tokens: IToken } | void> {
    try {
      const result = await userUseCaseEngine.login(
        this.userRepository,
        this.bcrypt,
        this.jwtToken,
        this.cloudSession,
        email,
        password,
        next
      );

      const userList =
        await this.conversationRepository.getUsersFromAllConversationForLoginAndLogout(
          result?.user?._id as string
        );
      (userList as TOnlinerUsersIdForLogout).map((user) => {
        if (user !== result?.user?._id?.toString()) {
          if (SocketClass.SocketUsers[user] !== undefined) {
            SocketClass.SocketUsers?.[user].emit("fromServerUserLogin", {
              _id: result?.user._id as string,
              name: result?.user.name as string,
            });
          }
        }
      });
      if (result !== undefined) {
        return result;
      }
    } catch (error: unknown) {
      catchError(error, next);
    }
  }
  // **************************************************************************************
  async logout(req: Req, res: Res, next: Next): Promise<void> {
    try {
      if (req.user) {
        const result =
          await this.conversationRepository.getUsersFromAllConversationForLoginAndLogout(
            req?.user?._id as string
          );
        (result as TOnlinerUsersIdForLogout).map((user) => {
          if (user !== req?.user?._id) {
            SocketClass.SocketUsers[user]?.emit(
              "fromServerUserLogout",
              req?.user?._id as string
            );
          }
        });
      }

      return await userUseCaseEngine.logout(
        this.cloudSession,
        this.requestManagement,
        req,
        res,
        next
      );
    } catch (error: unknown) {
      catchError(error, next);
    }
  }
  // **************************************************************************************
  async refresh(req: Req, res: Res, next: Next): Promise<IToken | void> {
    try {
      return (await userUseCaseEngine.refresh(
        this.cloudSession,
        this.jwtToken,
        req,
        next
      )) as IToken;
    } catch (error: unknown) {
      catchError(error, next);
    }
  }
  // **************************************************************************************
  async beInstructor(req: Req, next: Next): Promise<IJsonResponse | void> {
    try {
      return await userUseCaseEngine.beInstructor(
        this.instructorAgreementRepository,
        this.userRepository,
        this.notificationRepository,
        req,
        next
      );
    } catch (error: unknown) {
      catchError(error, next);
    }
  }
  // **************************************************************************************
  async forgotPassword(req: Req, next: Next): Promise<string | void> {
    try {
      return await userUseCaseEngine.forgotPassword(
        this.otpRepository,
        this.userRepository,
        this.sendMail,
        this.otpGenerator,
        this.jwtToken,
        req,
        next
      );
    } catch (error: unknown) {
      catchError(error, next);
    }
  }
  // **************************************************************************************
  async forgotPasswordOtpVerification(
    req: Req,
    next: Next,
    token: string
  ): Promise<IGeneralResponse | void> {
    try {
      return await userUseCaseEngine.forgotPasswordOtpVerification(
        this.otpRepository,
        this.jwtToken,
        req,
        next,
        token
      );
    } catch (error: unknown) {
      catchError(error, next);
    }
  }
  // **************************************************************************************

  async resetForgotPassword(
    req: Req,
    token: string,
    next: Next
  ): Promise<IGeneralResponse | void> {
    try {
      return await userUseCaseEngine.resetForgotPassword(
        this.userRepository,
        this.otpRepository,
        this.jwtToken,
        this.bcrypt,
        req,
        token,
        next
      );
    } catch (error: unknown) {
      catchError(error, next);
    }
  }
  // **************************************************************************************
  async userSession(req: Req, next: Next): Promise<IUser | void> {
    try {
      return await userUseCaseEngine.userSession(req, next);
    } catch (error: unknown) {
      catchError(error, next);
    }
  }
  // **************************************************************************************
  async getNotifications(
    req: Req,
    next: Next
  ): Promise<void | INotificationResponse> {
    try {
      return await userUseCaseEngine.getNotifications(
        this.notificationRepository,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // **************************************************************************************
  async updateNotifications(
    req: Req,
    next: Next
  ): Promise<void | { success: boolean; message: string }> {
    try {
      return await userUseCaseEngine.updateNotifications(
        this.notificationRepository,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // **************************************************************************************
  async gAuthUrl(req: Req, next: Next): Promise<void | string> {
    try {
      return await userUseCaseEngine.gAuthUrl(this.authService, next);
    } catch (error) {
      catchError(error, next);
    }
  }
  // **************************************************************************************
  async gAuth(
    req: Req,
    next: Next
  ): Promise<{ user: IUser; tokens: IToken } | void> {
    try {
      return await userUseCaseEngine.gAuth(
        this.authService,
        this.userRepository,
        this.jwtToken,
        this.cloudSession,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // **************************************************************************************
  async resendOtp(
    req: Req,
    next: Next
  ): Promise<{ success: boolean; message: string } | void> {
    try {
      return await userUseCaseEngine.resendOtp(
        this.jwtToken,
        this.otpRepository,
        this.sendMail,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
}
