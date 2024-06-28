"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstructorTutorials = void 0;
const courseModel_1 = __importDefault(require("../../models/courseModel"));
const getInstructorTutorials = async (courses) => {
    try {
        const result = await courseModel_1.default.find({ _id: { $in: courses } });
        return {
            status: 200,
            message: "instructor tutorials have fetched well",
            data: result,
        };
    }
    catch (error) {
        throw error;
    }
};
exports.getInstructorTutorials = getInstructorTutorials;
//# sourceMappingURL=getInstructorTutorials.js.map