"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCourseData = void 0;
const courseModel_1 = __importDefault(require("../../models/courseModel"));
const addCourseData = async (courseData) => {
    try {
        const result = await courseModel_1.default.findOneAndUpdate({
            instructor: courseData.instructor,
            submissionStatus: "work-in-progress",
        }, { $set: { ...courseData } }, {
            upsert: true,
            new: true,
        });
        if (result) {
            return {
                status: 201,
                message: "Course data has been created or updated",
                data: result,
            };
        }
        else {
            return {
                status: 404,
                message: "No matching document found or updated",
            };
        }
    }
    catch (error) {
        throw error;
    }
};
exports.addCourseData = addCourseData;
//# sourceMappingURL=addCourseData.js.map