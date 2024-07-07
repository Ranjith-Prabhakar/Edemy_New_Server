"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentStatus = void 0;
const catchError_1 = require("../../middlewares/catchError");
const errorHandler_1 = __importDefault(require("../../middlewares/errorHandler"));
const paymentStatus = async (paymentRepository, userRepository, courseRepository, cloudSession, categoryRepository, conversationRepository, req, next) => {
    try {
        const courseData = (await paymentRepository.findAndDelete(req.user?._id));
        if (courseData) {
            const [newUserData, isPurchaseUpdated, isCategoryUpdated] = await Promise.all([
                userRepository.addEnrolledCourse(courseData.courseId, req.user?._id),
                courseRepository.updatePurchas(courseData.courseId),
                categoryRepository.updateCategoryPurchasecount(courseData.category),
            ]);
            if (newUserData && isPurchaseUpdated && isCategoryUpdated) {
                await cloudSession.createUserSession(req.user?._id, newUserData);
                await conversationRepository.addParticipants(courseData.courseId, req.user?._id);
                return {
                    success: true,
                    message: "course has been added to the user collection",
                    data: newUserData,
                };
            }
            else {
                return next(new errorHandler_1.default(400, "please try again,something went wrong!!!"));
            }
        }
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.paymentStatus = paymentStatus;
//# sourceMappingURL=paymentStatus.js.map