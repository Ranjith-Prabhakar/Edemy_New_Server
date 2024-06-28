"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.topTenInstructorAndNoOfCourses_Statistics = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const topTenInstructorAndNoOfCourses_Statistics = async () => {
    try {
        const result = await userModel_1.default.aggregate([
            {
                $match: {
                    role: "instructor", // Filter for instructors
                    status: "active", // Filter for active users
                },
            },
            {
                $project: {
                    name: 1,
                    numberOfCourses: { $size: "$courses" }, // Calculate the number of courses for each instructor
                    _id: 0,
                },
            },
            {
                $sort: {
                    numberOfCourses: -1, // Sort by the number of courses in descending order
                },
            },
            {
                $limit: 10, // Limit to the top ten instructors
            },
        ]);
        return result;
    }
    catch (error) {
        throw error;
    }
};
exports.topTenInstructorAndNoOfCourses_Statistics = topTenInstructorAndNoOfCourses_Statistics;
//# sourceMappingURL=topTenInstructorAndNoOfCourses_Statistics.js.map