import { IUser } from "../../../entities/user";
import { IUserResponse } from "../request_And_Response/user";
import { IJsonResponse } from "../services/jsonResponse";

export interface IUserRepository {
  findUserByEmail(email: string): Promise<IUser | null>;
  createUser(newUser: IUser): Promise<IUser>;
  // 8888888888888888888888888888888888888888888888888888888888888888888888
  findAndUpdate(data: {
    [key: string]: string | number;
  }): Promise<IJsonResponse>;
  // 8888888888888888888888888888888888888888888888888888888888888888888888
  findByIdAndUpdate(
    id: string,
    data: { [key: string]: string | number }
  ): Promise<IJsonResponse>;
  // 8888888888888888888888888888888888888888888888888888888888888888888888
  // getUsers(role: string): Promise<IUser[]>;
  getUsers(
    role: string,
    pageNo?: number
  ): Promise<{ permitedNext: number; data: IUser[] }>;
  // 8888888888888888888888888888888888888888888888888888888888888888888888
  getUser(id: string): Promise<IUser>;
  // 8888888888888888888888888888888888888888888888888888888888888888888888
  freezUser(id: string): Promise<IUserResponse>;
  unFreezUser(id: string): Promise<IUserResponse>;
  addEnrolledCourse(courseId: string, userId: string): Promise<IUser | void>;
  updateCourses(courseId: string, useId: string): Promise<IUser | void>;
  getAdmin(): Promise<IUser | void>;
  topTenInstructorAndNoOfCourses_Statistics(): Promise<
    [{ name: string; numberOfCourses: string }] | void
  >;
}
