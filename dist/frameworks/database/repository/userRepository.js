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
exports.UserRepository = void 0;
// import {
//   createUser,
//   fidUserByEmail,
//   findAndUpdate,
//   findByIdAndUpdate,
//   addEnrolledCourse,
//   updateCourses,
//   getAdmin,
//   topTenInstructorAndNoOfCourses_Statistics,
// } from "./user/index";
const userRepositoryUserEngine = __importStar(require("./user/index"));
// import { getUsers, getUser, freezUser, unFreezUser } from "./admin/index";
const userRepositoryAdminEngine = __importStar(require("./admin/index"));
class UserRepository {
    userModels;
    constructor(userModels) {
        this.userModels = userModels;
    }
    // **************************************************************************************
    async findUserByEmail(email) {
        try {
            const userExist = await userRepositoryUserEngine.fidUserByEmail(email, this.userModels);
            return userExist;
        }
        catch (error) {
            throw error;
        }
    }
    // **************************************************************************************
    async createUser(newUser) {
        return await userRepositoryUserEngine.createUser(newUser, this.userModels);
    }
    // **************************************************************************************
    async findAndUpdate(data) {
        return await userRepositoryUserEngine.findAndUpdate(data, this.userModels);
    }
    ///888888888888888888888888888888888888888888888888888888888888888888888
    async findByIdAndUpdate(id, data) {
        return await userRepositoryUserEngine.findByIdAndUpdate(id, data);
    }
    ///888888888888888888888888888888888888888888888888888888888888888888888
    // async getUsers(role: string): Promise<IUser[]> {
    //   return await getUsers(role);
    // }
    async getUsers(role, pageNo) {
        return await userRepositoryAdminEngine.getUsers(role, pageNo);
    }
    ///888888888888888888888888888888888888888888888888888888888888888888888
    async getUser(id) {
        try {
            return await userRepositoryAdminEngine.getUser(id);
        }
        catch (error) {
            throw error;
        }
    }
    ///888888888888888888888888888888888888888888888888888888888888888888888
    async freezUser(id) {
        try {
            return await userRepositoryAdminEngine.freezUser(id);
        }
        catch (error) {
            throw error;
        }
    }
    ///888888888888888888888888888888888888888888888888888888888888888888888
    async unFreezUser(id) {
        try {
            return await userRepositoryAdminEngine.unFreezUser(id);
        }
        catch (error) {
            throw error;
        }
    }
    ///888888888888888888888888888888888888888888888888888888888888888888888
    async addEnrolledCourse(courseId, userId) {
        try {
            return await userRepositoryUserEngine.addEnrolledCourse(courseId, userId);
        }
        catch (error) {
            throw error;
        }
    }
    ///888888888888888888888888888888888888888888888888888888888888888888888
    async updateCourses(courseId, userId) {
        try {
            return await userRepositoryUserEngine.updateCourses(courseId, userId);
        }
        catch (error) {
            throw error;
        }
    }
    ///888888888888888888888888888888888888888888888888888888888888888888888
    async getAdmin() {
        try {
            return await userRepositoryUserEngine.getAdmin();
        }
        catch (error) {
            throw error;
        }
    }
    ///888888888888888888888888888888888888888888888888888888888888888888888
    async topTenInstructorAndNoOfCourses_Statistics() {
        try {
            return await userRepositoryUserEngine.topTenInstructorAndNoOfCourses_Statistics();
        }
        catch (error) {
            throw error;
        }
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=userRepository.js.map