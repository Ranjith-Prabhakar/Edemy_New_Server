"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoursesInRequest = void 0;
const courseModel_1 = __importDefault(require("../../models/courseModel"));
const getCoursesInRequest = async () => {
    try {
        const result = await courseModel_1.default.find({
            status: "pending",
            submissionStatus: "completed",
        });
        return {
            status: 200,
            message: "existing courses have been fetched successfully",
            data: result,
        };
    }
    catch (error) {
        throw error;
    }
};
exports.getCoursesInRequest = getCoursesInRequest;
//# sourceMappingURL=getCoursesInRequest.js.map