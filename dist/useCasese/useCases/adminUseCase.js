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
exports.AdminUseCase = void 0;
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
const adminUseCaseEngine = __importStar(require("./admin/index"));
const StaticClassProperty_1 = require("../staticClassProperty/StaticClassProperty");
const notification_1 = require("../../entities/notification");
const catchError_1 = require("../middlewares/catchError");
class AdminUseCase {
    userRepository;
    instrctorAgreementRepository;
    categoryRepository;
    notificationRepository;
    cloudSession;
    courseRepository;
    reviewAndRatingRepository;
    constructor(userRepository, instrctorAgreementRepository, categoryRepository, notificationRepository, cloudSession, courseRepository, reviewAndRatingRepository) {
        this.userRepository = userRepository;
        this.instrctorAgreementRepository = instrctorAgreementRepository;
        this.categoryRepository = categoryRepository;
        this.notificationRepository = notificationRepository;
        this.cloudSession = cloudSession;
        this.courseRepository = courseRepository;
        this.reviewAndRatingRepository = reviewAndRatingRepository;
    }
    // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async approveOrRejectInstructor(req, next) {
        try {
            const { userId } = req.body;
            const result = (await adminUseCaseEngine.approveOrRejectInstructor(this.userRepository, this.instrctorAgreementRepository, req, next));
            // have to check whethere approve or not (but not done it now )
            const notificationRepoUpdate = await this.notificationRepository.addNotification(userId, result.message === notification_1.ENotificationMsg.instructorRequestApproval
                ? notification_1.ENotification.instructorRequestApproval
                : notification_1.ENotification.instructorRequestRejection);
            if (notificationRepoUpdate &&
                result.message === notification_1.ENotificationMsg.instructorRequestApproval) {
                const userSession = (await this.cloudSession.getUser(userId));
                const parsedUserSession = JSON.parse(userSession);
                parsedUserSession.role = "instructor";
                await this.cloudSession.createUserSession(userId, parsedUserSession);
            }
            // -------------------------------------------------------------------------------
            StaticClassProperty_1.SocketClass.SocketUsers[userId].emit("fromServerInstrctorRequestApproval", result.message);
            return result;
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async instructorRequests(next) {
        try {
            return await adminUseCaseEngine.instructorRequests(this.instrctorAgreementRepository, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async getUsers(req, next) {
        try {
            return await adminUseCaseEngine.getUsers(this.userRepository, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async getUser(req, next) {
        try {
            return await adminUseCaseEngine.getUser(this.userRepository, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async freezUser(req, next) {
        try {
            return adminUseCaseEngine.freezUser(this.userRepository, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async unFreezUser(req, next) {
        try {
            return adminUseCaseEngine.unFreezUser(this.userRepository, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async getInstructors(req, next) {
        try {
            return await adminUseCaseEngine.getInstructors(this.userRepository, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async addCategory(req, next) {
        try {
            return await adminUseCaseEngine.addCategory(this.categoryRepository, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async getCategories(next) {
        try {
            return await adminUseCaseEngine.getCategories(this.categoryRepository, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async freezCategory(req, next) {
        try {
            return await adminUseCaseEngine.freezCategory(req, next, this.categoryRepository);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async unFreezCategory(req, next) {
        try {
            return await adminUseCaseEngine.unFreezCategory(req, next, this.categoryRepository);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async getStatistics(next) {
        try {
            return await adminUseCaseEngine.getStatistics(this.courseRepository, this.categoryRepository, this.reviewAndRatingRepository, this.userRepository, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
}
exports.AdminUseCase = AdminUseCase;
//# sourceMappingURL=adminUseCase.js.map