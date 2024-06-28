"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCourses = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const updateCourses = async (courseId, userId) => {
    try {
        const result = await userModel_1.default.findOneAndUpdate({ _id: userId }, { $addToSet: { courses: courseId } }, { new: true });
        if (result && result._id) {
            return result;
        }
    }
    catch (error) {
        throw error;
    }
};
exports.updateCourses = updateCourses;
//# sourceMappingURL=updateCourses.js.map