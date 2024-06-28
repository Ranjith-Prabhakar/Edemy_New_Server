"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCourse = void 0;
const courseModel_1 = __importDefault(require("../../models/courseModel"));
const updateCourse = async (instructor, datum) => {
    try {
        const result = await courseModel_1.default.findOneAndUpdate({
            instructor,
            submissionStatus: "work-in-progress",
        }, { $set: { ...datum } }, { new: true });
        if (result) {
            return {
                status: 200,
                message: "Document has been updated successfully",
                data: result,
            };
        }
        else {
            return {
                status: 404,
                message: "No document was updated",
            };
        }
    }
    catch (error) {
        throw error;
    }
};
exports.updateCourse = updateCourse;
//# sourceMappingURL=updateCourse.js.map