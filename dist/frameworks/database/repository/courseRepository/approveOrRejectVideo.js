"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveOrRejectVideo = void 0;
const courseModel_1 = __importDefault(require("../../models/courseModel"));
const approveOrRejectVideo = async (courseId, action) => {
    try {
        const result = await courseModel_1.default.findByIdAndUpdate(courseId, { status: action }, { new: true });
        return {
            status: 200,
            message: "course status has been updated",
            data: result,
        };
    }
    catch (error) {
        throw error;
    }
};
exports.approveOrRejectVideo = approveOrRejectVideo;
//# sourceMappingURL=approveOrRejectVideo.js.map