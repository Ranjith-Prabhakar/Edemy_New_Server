"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesController = void 0;
const catchError_1 = require("../useCasese/middlewares/catchError");
const inputValidation_1 = require("./middleware/inputValidation");
class CoursesController {
    courseUseCase;
    constructor(courseUseCase) {
        this.courseUseCase = courseUseCase;
    }
    async getCourseInProgress(req, res, next) {
        try {
            await (0, inputValidation_1.inputValidation)(req, "getCourseInProgress", next);
            const result = await this.courseUseCase.getCourseInProgress(req, next);
            res.status(200).json(result);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    async addCourseData(req, res, next) {
        try {
            await (0, inputValidation_1.inputValidation)(req, "addCourseData", next);
            const result = await this.courseUseCase.addCourseData(req, next);
            res.status(200).json(result);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    async addFileToCloud(req, res, next) {
        try {
            await (0, inputValidation_1.inputValidation)(req, "addFileToCloud", next);
            const result = await this.courseUseCase.addFileToCloud(req, next);
            res.status(200).json(result);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    async updateCourse(req, res, next) {
        try {
            await (0, inputValidation_1.inputValidation)(req, "updateCourse", next);
            const result = await this.courseUseCase.updateCourse(req, next);
            res.status(200).json(result);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    async addModuleVideos(req, res, next) {
        try {
            await (0, inputValidation_1.inputValidation)(req, "addModuleVideos", next);
            const result = await this.courseUseCase.addModuleVideos(req, next);
            res.status(200).json(result);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    async getCourses(req, res, next) {
        try {
            const result = await this.courseUseCase.getCourses(req, next);
            res.status(200).json(result);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    async getCoursesInRequest(req, res, next) {
        try {
            const result = await this.courseUseCase.getCoursesInRequest(req, next);
            res.status(200).json(result);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    async getVideoPresignedUrl(req, res, next) {
        try {
            await (0, inputValidation_1.inputValidation)(req, "getVideoPresignedUrl", next);
            const result = await this.courseUseCase.getVideoPresignedUrl(req, next);
            res.status(200).json(result);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    async approveOrRejectVideo(req, res, next) {
        try {
            await (0, inputValidation_1.inputValidation)(req, "approveOrRejectVideo", next);
            const result = await this.courseUseCase.approveOrRejectVideo(req, next);
            res.status(200).json(result);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    async getCoursesForUser(req, res, next) {
        try {
            await (0, inputValidation_1.inputValidation)(req, "getCoursesForUser", next);
            const result = await this.courseUseCase.getCoursesForUser(req, next);
            res.status(200).json(result);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    async getCategories(req, res, next) {
        try {
            const result = await this.courseUseCase.getCategories(req, next);
            res.status(200).json({
                success: true,
                message: "categories fectched successfully",
                data: result,
            });
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    async getVideoForUser(req, res, next) {
        try {
            await (0, inputValidation_1.inputValidation)(req, "getVideoForUser", next);
            const result = await this.courseUseCase.getVideoForUser(req, next);
            if (result)
                res.status(200).json(result);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    async getVideoForVisitors(req, res, next) {
        try {
            await (0, inputValidation_1.inputValidation)(req, "getVideoForVisitors", next);
            const result = await this.courseUseCase.getVideoForVisitors(req, next);
            if (result)
                res.status(200).json(result);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    async enrollCourse(req, res, next) {
        try {
            await (0, inputValidation_1.inputValidation)(req, "enrollCourse", next);
            const result = await this.courseUseCase.enrollCourse(req, next);
            if (result)
                res.status(200).json(result);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    async paymentStatus(req, res, next) {
        try {
            await (0, inputValidation_1.inputValidation)(req, "paymentStatus", next);
            const result = await this.courseUseCase.paymentStatus(req, next);
            if (result)
                res.status(200).json(result);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    async updateReviewAndRating(req, res, next) {
        try {
            await (0, inputValidation_1.inputValidation)(req, "updateReviewAndRating", next);
            const result = await this.courseUseCase.updateReviewAndRating(req, next);
            if (result)
                res.status(200).json(result);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    async getSingleCourseReviewAndRating(req, res, next) {
        try {
            const result = await this.courseUseCase.getSingleCourseReviewAndRating(req, next);
            if (result)
                res.status(200).json(result);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    async getThumbnamilImagePresignedUrl(req, res, next) {
        try {
            const result = await this.courseUseCase.getThumbnamilImagePresignedUrl(req, next);
            if (result)
                res.status(200).json(result);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    async getUserEnrolledCourses(req, res, next) {
        try {
            await (0, inputValidation_1.inputValidation)(req, "getUserEnrolledCourses", next);
            const result = await this.courseUseCase.getUserEnrolledCourses(req, next);
            if (result)
                res.status(200).json(result);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    async getCourseByCategory(req, res, next) {
        try {
            await (0, inputValidation_1.inputValidation)(req, "getCourseByCategory", next);
            const result = await this.courseUseCase.getCourseByCategory(req, next);
            if (result)
                res.status(200).json(result);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    async getCourseForSearch(req, res, next) {
        try {
            await (0, inputValidation_1.inputValidation)(req, "getCourseForSearch", next);
            const result = await this.courseUseCase.getCourseForSearch(req, next);
            if (result)
                res.status(200).json(result);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    async getInstructorTutorials(req, res, next) {
        try {
            await (0, inputValidation_1.inputValidation)(req, "getInstructorTutorials", next);
            const result = await this.courseUseCase.getInstructorTutorials(req, next);
            if (result)
                res.status(200).json(result);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    async setVideoTrack(req, res, next) {
        try {
            await (0, inputValidation_1.inputValidation)(req, "setVideoTrack", next);
            const result = await this.courseUseCase.setVideoTrack(req, next);
            if (result)
                res.status(200).json(result);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
}
exports.CoursesController = CoursesController;
//# sourceMappingURL=coursesController.js.map