import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICourseRepository } from "../../interface/repository/courseRepository";
import { INotificationRepository } from "../../interface/repository/notificationRepository";
import { IUserRepository } from "../../interface/repository/userRepository";
import { ICourseResponse } from "../../interface/request_And_Response/course";
export declare const updateCourse: (courseRepository: ICourseRepository, userRepository: IUserRepository, notificationRepository: INotificationRepository, req: Req, next: Next) => Promise<ICourseResponse | void>;
