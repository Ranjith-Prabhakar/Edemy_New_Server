"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseInProgress = void 0;
const errorHandler_1 = __importDefault(require("../../../../useCasese/middlewares/errorHandler"));
const courseModel_1 = __importDefault(require("../../models/courseModel"));
const getCourseInProgress = async (instructor) => {
    try {
        const result = await courseModel_1.default.findOne({
            instructor,
            submissionStatus: "work-in-progress",
        });
        if (result === null)
            throw new errorHandler_1.default(404, "no courses in progress");
        return {
            status: 200,
            message: "course has been found successfully",
            data: result,
        };
    }
    catch (error) {
        throw error;
    }
};
exports.getCourseInProgress = getCourseInProgress;
//# sourceMappingURL=getCourseInProgress.js.map