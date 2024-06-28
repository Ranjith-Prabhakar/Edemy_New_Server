"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourses = void 0;
const courseModel_1 = __importDefault(require("../../models/courseModel"));
const getCourses = async () => {
    try {
        const result = await courseModel_1.default.find({
            status: { $in: ["approved", "freez"] },
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
exports.getCourses = getCourses;
//# sourceMappingURL=getCourses.js.map