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
exports.CourseUseCase = void 0;
const courseUseCaseEngine = __importStar(require("./course/index"));
const catchError_1 = require("../middlewares/catchError");
const StaticClassProperty_1 = require("../staticClassProperty/StaticClassProperty");
const notification_1 = require("../../entities/notification");
class CourseUseCase {
    cloudStorage;
    courseRepository;
    categoryRepository;
    paymentService;
    paymentRepository;
    userRepository;
    cloudSesssion;
    reviewAndRatingRepository;
    courseTrackingRepository;
    notificationRepository;
    conversationRepository;
    constructor(cloudStorage, courseRepository, categoryRepository, paymentService, paymentRepository, userRepository, cloudSesssion, reviewAndRatingRepository, courseTrackingRepository, notificationRepository, conversationRepository) {
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
    async getCourseInProgress(req, next) {
        try {
            return await courseUseCaseEngine.getCourseInProgress(this.courseRepository, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async addCourseData(req, next) {
        try {
            return await courseUseCaseEngine.addCourseData(this.courseRepository, this.userRepository, this.cloudSesssion, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async addFileToCloud(req, next) {
        try {
            return await courseUseCaseEngine.addFileToCloud(this.cloudStorage, this.courseRepository, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async updateCourse(req, next) {
        try {
            return await courseUseCaseEngine.updateCourse(this.courseRepository, this.userRepository, this.notificationRepository, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async addModuleVideos(req, next) {
        try {
            return await courseUseCaseEngine.addModuleVideos(this.courseRepository, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async getCourses(req, next) {
        try {
            return await courseUseCaseEngine.getCourses(this.courseRepository, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async getCoursesInRequest(req, next) {
        try {
            return await courseUseCaseEngine.getCoursesInRequest(this.courseRepository, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async getVideoPresignedUrl(req, next) {
        try {
            return await courseUseCaseEngine.getVideoPresignedUrl(this.cloudStorage, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async approveOrRejectVideo(req, next) {
        try {
            const result = await courseUseCaseEngine.approveOrRejectVideo(this.courseRepository, req, next);
            // adding admin and instructor into the conversation
            const resultData = result?.data;
            const instructorId = resultData.instructor;
            const adminId = req.user?._id;
            const courseId = resultData._id;
            Promise.all([
                await this.conversationRepository.addParticipants(courseId, adminId),
                await this.conversationRepository.addParticipants(courseId, instructorId),
            ]);
            const notificationRepoUpdate = await this.notificationRepository.addNotification(req.body.instructorId, notification_1.ENotification.courseApprovalApprovance);
            if (notificationRepoUpdate) {
                const instructorMessage = (result?.data).status === "approved"
                    ? notification_1.ENotificationMsg.courseApprovalApprovance
                    : notification_1.ENotificationMsg.courseApprovalRejection;
                //sending notification to the instructor
                StaticClassProperty_1.SocketClass.SocketUsers[req.body.instructorId].emit("fromServerCourseApproved", instructorMessage);
                if ((result?.data).status === "approved") {
                    // sendin notification to all online users except instructor
                    const usersExceptInstructor = StaticClassProperty_1.SocketClass.SocketUsers;
                    delete usersExceptInstructor[req.body.instructorId];
                    delete usersExceptInstructor[req.user?._id];
                    const activeUsers = Object.values(usersExceptInstructor);
                    activeUsers.forEach((user) => user.emit("fromServerCourseApprovedNotificationForAllUsers", notification_1.ENotificationMsg.courseApprovalApprovanceForAllUsers));
                }
            }
            return result;
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async getCoursesForUser(req, next) {
        try {
            return await courseUseCaseEngine.getCoursesForUser(this.courseRepository, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async getCategories(req, next) {
        try {
            return await courseUseCaseEngine.getCategories(this.categoryRepository, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async getVideoForUser(req, next) {
        try {
            return await courseUseCaseEngine.getVideoForUser(this.courseRepository, this.cloudStorage, this.courseTrackingRepository, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async getVideoForVisitors(req, next) {
        try {
            return await courseUseCaseEngine.getVideoForVisitors(this.courseRepository, this.cloudStorage, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async enrollCourse(req, next) {
        try {
            return await courseUseCaseEngine.enrollCourse(this.paymentService, this.paymentRepository, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async paymentStatus(req, next) {
        try {
            return await courseUseCaseEngine.paymentStatus(this.paymentRepository, this.userRepository, this.courseRepository, this.cloudSesssion, this.categoryRepository, this.conversationRepository, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async updateReviewAndRating(req, next) {
        try {
            return await courseUseCaseEngine.updateReviewAndRating(this.reviewAndRatingRepository, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888;
    async getSingleCourseReviewAndRating(req, next) {
        try {
            return await courseUseCaseEngine.getSingleCourseReviewAndRating(this.reviewAndRatingRepository, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888;
    async getThumbnamilImagePresignedUrl(req, next) {
        try {
            return await courseUseCaseEngine.getThumbnamilImagePresignedUrl(this.cloudStorage, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888;
    async getUserEnrolledCourses(req, next) {
        try {
            return await courseUseCaseEngine.getUserEnrolledCourses(this.courseRepository, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888;
    async getCourseByCategory(req, next) {
        try {
            return await courseUseCaseEngine.getCourseByCategory(this.courseRepository, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888;
    async getCourseForSearch(req, next) {
        try {
            const result = await courseUseCaseEngine.getCourseForSearch(this.courseRepository, req, next);
            return result;
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888;
    async getInstructorTutorials(req, next) {
        try {
            return await courseUseCaseEngine.getInstructorTutorials(this.courseRepository, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // 8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888;
    async setVideoTrack(req, next) {
        try {
            return await courseUseCaseEngine.setVideoTrack(this.courseTrackingRepository, req, next);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
}
exports.CourseUseCase = CourseUseCase;
//# sourceMappingURL=courseUseCase.js.map