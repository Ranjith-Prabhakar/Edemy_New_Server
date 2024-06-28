"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRepository = void 0;
// import {
//   getCourseInProgress,
//   addCourseData,
//   updateCourse,
//   addModuleVideos,
//   findByName,
//   getCourses,
//   getCoursesInRequest,
//   approveOrRejectVideo,
//   getCoursesForUser,
//   isPreview,
//   updatePurchas,
//   getUserEnrolledCourses,
//   getCourseByCategory,
//   getCourseForSearch,
//   getInstructorTutorials,
//   monthlySaleAndRevenue_Statistics,
// } from "./courseRepository/index";
const courseRepositoryEngine = __importStar(require("./courseRepository/index"));
class CourseRepository {
    constructor() { }
    async getCourseInProgress(instructor) {
        try {
            return await courseRepositoryEngine.getCourseInProgress(instructor);
        }
        catch (error) {
            throw error;
        }
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async addCourseData(courseData) {
        try {
            return await courseRepositoryEngine.addCourseData(courseData);
        }
        catch (error) {
            throw error;
        }
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async updateCourse(instructor, datum) {
        try {
            return await courseRepositoryEngine.updateCourse(instructor, datum);
        }
        catch (error) {
            throw error;
        }
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async addModuleVideos(data, instructor) {
        try {
            return await courseRepositoryEngine.addModuleVideos(data, instructor);
        }
        catch (error) {
            throw error;
        }
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async findByName(courseName) {
        try {
            return await courseRepositoryEngine.findByName(courseName);
        }
        catch (error) {
            throw error;
        }
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async getCourses() {
        try {
            return await courseRepositoryEngine.getCourses();
        }
        catch (error) {
            throw error;
        }
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async getCoursesInRequest() {
        try {
            return await courseRepositoryEngine.getCoursesInRequest();
        }
        catch (error) {
            throw error;
        }
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async approveOrRejectVideo(courseId, action) {
        try {
            return await courseRepositoryEngine.approveOrRejectVideo(courseId, action);
        }
        catch (error) {
            throw error;
        }
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async getCoursesForUser() {
        try {
            return await courseRepositoryEngine.getCoursesForUser();
        }
        catch (error) {
            throw error;
        }
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async isPreview(courseId, moduleNo, videoNo) {
        try {
            return await courseRepositoryEngine.isPreview(courseId, moduleNo, videoNo);
        }
        catch (error) {
            throw error;
        }
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async updatePurchas(courseId) {
        try {
            return await courseRepositoryEngine.updatePurchas(courseId);
        }
        catch (error) {
            throw error;
        }
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async getUserEnrolledCourses(courses) {
        try {
            return await courseRepositoryEngine.getUserEnrolledCourses(courses);
        }
        catch (error) {
            throw error;
        }
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async getCourseByCategory(category, pageNumber, frequency, sort, filter) {
        try {
            return await courseRepositoryEngine.getCourseByCategory(category, pageNumber, frequency, sort, filter);
        }
        catch (error) {
            throw error;
        }
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async getCourseForSearch(key, pageNumber, frequency, sort, filter) {
        try {
            return await courseRepositoryEngine.getCourseForSearch(key, pageNumber, frequency, sort, filter);
        }
        catch (error) {
            throw error;
        }
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async getInstructorTutorials(courses) {
        try {
            return await courseRepositoryEngine.getInstructorTutorials(courses);
        }
        catch (error) {
            throw error;
        }
    }
    // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
    async monthlySaleAndRevenue_Statistics() {
        try {
            return await courseRepositoryEngine.monthlySaleAndRevenue_Statistics();
        }
        catch (error) {
            throw error;
        }
    }
}
exports.CourseRepository = CourseRepository;
//# sourceMappingURL=courseRepository.js.map