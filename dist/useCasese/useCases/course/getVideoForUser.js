"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideoForUser = void 0;
const catchError_1 = require("../../middlewares/catchError");
const errorHandler_1 = __importDefault(require("../../middlewares/errorHandler"));
const getVideoForUser = async (courseRepository, cloudStorage, courseTrackingRepository, req, next) => {
    try {
        const { courseId, moduleNo, videoNo, videoName } = req.body;
        if (req.user?.role === "admin") {
            ///
            const position = await courseTrackingRepository.getVideoTracking(courseId, req.user._id, moduleNo, videoNo);
            if (position) {
                const cloudResponse = await cloudStorage.getVideoPresignedUrl(videoName);
                return { ...cloudResponse, ...position };
            }
            else {
                return await cloudStorage.getVideoPresignedUrl(videoName);
            }
        }
        else if (req.user?.role === "instructor" &&
            req.user?.courses?.includes(courseId)) {
            ///
            const position = await courseTrackingRepository.getVideoTracking(courseId, req.user._id, moduleNo, videoNo);
            ///
            if (position) {
                const cloudResponse = await cloudStorage.getVideoPresignedUrl(videoName);
                return { ...cloudResponse, ...position };
            }
            else {
                return await cloudStorage.getVideoPresignedUrl(videoName);
            }
        }
        else {
            const isEnrolled = req.user?.enrolledCourses?.includes(courseId);
            if (isEnrolled) {
                ///
                const position = await courseTrackingRepository.getVideoTracking(courseId, req.user?._id, moduleNo, videoNo);
                ///
                if (position) {
                    const cloudResponse = await cloudStorage.getVideoPresignedUrl(videoName);
                    return { ...cloudResponse, ...position };
                }
                else {
                    return await cloudStorage.getVideoPresignedUrl(videoName);
                }
            }
            const isPreview = await courseRepository.isPreview(courseId, moduleNo, videoNo);
            if (isPreview) {
                return await cloudStorage.getVideoPresignedUrl(videoName);
            }
            else {
                return next(new errorHandler_1.default(404, "you have to purchase the course to watch the video"));
            }
        }
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.getVideoForUser = getVideoForUser;
//# sourceMappingURL=getVideoForUser.js.map