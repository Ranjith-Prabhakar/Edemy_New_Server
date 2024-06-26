import userModel from "../models/userModel";

import { IUserRepository } from "../../../useCasese/interface/repository/userRepository";
import { IUser } from "../../../entities/user";

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
import * as userRepositoryUserEngine from "./user/index";
// import { getUsers, getUser, freezUser, unFreezUser } from "./admin/index";
import * as userRepositoryAdminEngine from "./admin/index";
import { IJsonResponse } from "../../../useCasese/interface/services/jsonResponse";
import { IUserResponse } from "../../../useCasese/interface/request_And_Response/user";

export class UserRepository implements IUserRepository {
  constructor(private userModels: typeof userModel) {}
  // **************************************************************************************
  async findUserByEmail(email: string): Promise<IUser | null> {
    try {
      const userExist = await userRepositoryUserEngine.fidUserByEmail(
        email,
        this.userModels
      );
      return userExist;
    } catch (error) {
      throw error;
    }
  }
  // **************************************************************************************
  async createUser(newUser: IUser): Promise<IUser> {
    return await userRepositoryUserEngine.createUser(newUser, this.userModels);
  }

  // **************************************************************************************
  async findAndUpdate(data: {
    [key: string]: string | number;
  }): Promise<IJsonResponse> {
    return await userRepositoryUserEngine.findAndUpdate(data, this.userModels);
  }
  ///888888888888888888888888888888888888888888888888888888888888888888888
  async findByIdAndUpdate(
    id: string,
    data: { [key: string]: string | number }
  ): Promise<IJsonResponse> {
    return await userRepositoryUserEngine.findByIdAndUpdate(id, data);
  }
  ///888888888888888888888888888888888888888888888888888888888888888888888
  // async getUsers(role: string): Promise<IUser[]> {
  //   return await getUsers(role);
  // }
  async getUsers(
    role: string,
    pageNo: number
  ): Promise<{ permitedNext: number; data: IUser[] }> {
    return await userRepositoryAdminEngine.getUsers(role, pageNo);
  }
  ///888888888888888888888888888888888888888888888888888888888888888888888
  async getUser(id: string): Promise<IUser> {
    try {
      return await userRepositoryAdminEngine.getUser(id);
    } catch (error) {
      throw error;
    }
  }
  ///888888888888888888888888888888888888888888888888888888888888888888888
  async freezUser(id: string): Promise<IUserResponse> {
    try {
      return await userRepositoryAdminEngine.freezUser(id);
    } catch (error) {
      throw error;
    }
  }
  ///888888888888888888888888888888888888888888888888888888888888888888888
  async unFreezUser(id: string): Promise<IUserResponse> {
    try {
      return await userRepositoryAdminEngine.unFreezUser(id);
    } catch (error) {
      throw error;
    }
  }
  ///888888888888888888888888888888888888888888888888888888888888888888888
  async addEnrolledCourse(
    courseId: string,
    userId: string
  ): Promise<IUser | void> {
    try {
      return await userRepositoryUserEngine.addEnrolledCourse(courseId, userId);
    } catch (error) {
      throw error;
    }
  }
  ///888888888888888888888888888888888888888888888888888888888888888888888
  async updateCourses(courseId: string, userId: string): Promise<IUser | void> {
    try {
      return await userRepositoryUserEngine.updateCourses(courseId, userId);
    } catch (error) {
      throw error;
    }
  }
  ///888888888888888888888888888888888888888888888888888888888888888888888
  async getAdmin(): Promise<void | IUser> {
    try {
      return await userRepositoryUserEngine.getAdmin();
    } catch (error) {
      throw error;
    }
  }
  ///888888888888888888888888888888888888888888888888888888888888888888888
  async topTenInstructorAndNoOfCourses_Statistics(): Promise<
    void | [{ name: string; numberOfCourses: string }]
  > {
    try {
      return await userRepositoryUserEngine.topTenInstructorAndNoOfCourses_Statistics();
    } catch (error) {
      throw error;
    }
  }
}
