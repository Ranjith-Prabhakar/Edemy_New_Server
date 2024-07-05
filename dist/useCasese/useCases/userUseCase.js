"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUsecase = void 0;
//
const StaticClassProperty_1 = require("../staticClassProperty/StaticClassProperty");
const userUseCaseEngine = __importStar(require("./user/index"));
const catchError_1 = require("../middlewares/catchError");
class UserUsecase {
    userRepository;
    bcrypt;
    otpGenerator;
    sendMail;
    otpRepository;
    jwtToken;
    cloudSession;
    requestManagement;
    instructorAgreementRepository;
    notificationRepository;
    authService;
    conversationRepository;
    //
    constructor(userRepository, bcrypt, otpGenerator, sendMail, otpRepository, jwtToken, cloudSession, requestManagement, instructorAgreementRepository, notificationRepository, authService, conversationRepository) {
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
    async registerUser({ name, email, password, }, next) {
        try {
            const result = await userUseCaseEngine.registerUser(this.otpRepository, this.userRepository, this.sendMail, this.otpGenerator, this.jwtToken, this.bcrypt, email, name, password, next);
            return result;
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // **************************************************************************************
    async createUser(verificationCode, token, next) {
        try {
            return await userUseCaseEngine.createUser(this.userRepository, this.otpRepository, this.jwtToken, verificationCode, token, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // **************************************************************************************
    async login({ email, password }, next) {
        try {
            const result = await userUseCaseEngine.login(this.userRepository, this.bcrypt, this.jwtToken, this.cloudSession, email, password, next);
            const userList = await this.conversationRepository.getUsersFromAllConversationForLoginAndLogout(result?.user?._id);
            userList.map((user) => {
                if (user !== result?.user?._id?.toString()) {
                    if (StaticClassProperty_1.SocketClass.SocketUsers[user] !== undefined) {
                        StaticClassProperty_1.SocketClass.SocketUsers?.[user].emit("fromServerUserLogin", {
                            _id: result?.user._id,
                            name: result?.user.name,
                        });
                    }
                }
            });
            if (result !== undefined) {
                return result;
            }
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // **************************************************************************************
    async logout(req, res, next) {
        try {
            if (req.user) {
                const result = await this.conversationRepository.getUsersFromAllConversationForLoginAndLogout(req?.user?._id);
                result.map((user) => {
                    if (user !== req?.user?._id) {
                        StaticClassProperty_1.SocketClass.SocketUsers[user]?.emit("fromServerUserLogout", req?.user?._id);
                    }
                });
            }
            return await userUseCaseEngine.logout(this.cloudSession, this.requestManagement, req, res, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // **************************************************************************************
    async refresh(req, res, next) {
        try {
            return (await userUseCaseEngine.refresh(this.cloudSession, this.jwtToken, req, next));
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // **************************************************************************************
    async beInstructor(req, next) {
        try {
            return await userUseCaseEngine.beInstructor(this.instructorAgreementRepository, this.userRepository, this.notificationRepository, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // **************************************************************************************
    async forgotPassword(req, next) {
        try {
            return await userUseCaseEngine.forgotPassword(this.otpRepository, this.userRepository, this.sendMail, this.otpGenerator, this.jwtToken, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // **************************************************************************************
    async forgotPasswordOtpVerification(req, next, token) {
        try {
            return await userUseCaseEngine.forgotPasswordOtpVerification(this.otpRepository, this.jwtToken, req, next, token);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // **************************************************************************************
    async resetForgotPassword(req, token, next) {
        try {
            return await userUseCaseEngine.resetForgotPassword(this.userRepository, this.otpRepository, this.jwtToken, this.bcrypt, req, token, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // **************************************************************************************
    async userSession(req, next) {
        try {
            return await userUseCaseEngine.userSession(req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // **************************************************************************************
    async getNotifications(req, next) {
        try {
            return await userUseCaseEngine.getNotifications(this.notificationRepository, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // **************************************************************************************
    async updateNotifications(req, next) {
        try {
            return await userUseCaseEngine.updateNotifications(this.notificationRepository, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // **************************************************************************************
    async gAuthUrl(req, next) {
        try {
            return await userUseCaseEngine.gAuthUrl(this.authService, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // **************************************************************************************
    async gAuth(req, next) {
        try {
            return await userUseCaseEngine.gAuth(this.authService, this.userRepository, this.jwtToken, this.cloudSession, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // **************************************************************************************
    async resendOtp(req, next) {
        try {
            return await userUseCaseEngine.resendOtp(this.jwtToken, this.otpRepository, this.sendMail, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
}
exports.UserUsecase = UserUsecase;
//# sourceMappingURL=userUseCase.js.map