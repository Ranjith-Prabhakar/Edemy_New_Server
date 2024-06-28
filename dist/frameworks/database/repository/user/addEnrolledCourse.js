"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEnrolledCourse = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const addEnrolledCourse = async (courseId, userId) => {
    try {
        const result = (await userModel_1.default.findOneAndUpdate({ _id: userId }, { $addToSet: { enrolledCourses: courseId } }, { returnDocument: "after" }));
        return result;
    }
    catch (error) {
        throw error;
    }
};
exports.addEnrolledCourse = addEnrolledCourse;
//# sourceMappingURL=addEnrolledCourse.js.map