"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideoForVisitors = void 0;
const catchError_1 = require("../../middlewares/catchError");
const errorHandler_1 = __importDefault(require("../../middlewares/errorHandler"));
const getVideoForVisitors = async (courseRepository, cloudStorage, req, next) => {
    try {
        const { courseId, moduleNo, videoNo, videoName } = req.body;
        const isPreview = await courseRepository.isPreview(courseId, moduleNo, videoNo);
        if (isPreview) {
            return await cloudStorage.getVideoPresignedUrl(videoName);
        }
        else {
            return next(new errorHandler_1.default(404, "you have to purchase the course to watch the video"));
        }
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.getVideoForVisitors = getVideoForVisitors;
//# sourceMappingURL=getVideoForVisitors.js.map