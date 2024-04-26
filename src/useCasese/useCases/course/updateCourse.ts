import { ICourse } from "../../../entities/course";
import { ENotification } from "../../../entities/notification";
import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICourseRepository } from "../../interface/repository/courseRepository";
import { INotificationRepository } from "../../interface/repository/notificationRepository";
import { IUserRepository } from "../../interface/repository/userRepository";
import { ICourseResponse } from "../../interface/request_And_Response/course";
import { catchError } from "../../middlewares/catchError";
import { SocketClass } from "../../staticClassProperty/StaticClassProperty";

export const updateCourse = async (
  courseRepository: ICourseRepository,
  userRepository: IUserRepository,
  notificationRepository: INotificationRepository,
  req: Req,
  next: Next
): Promise<ICourseResponse | void> => {
  try {
    const courseResutl = await courseRepository.updateCourse(
      req.user?._id as string,
      req.body
    );
    if (courseResutl) {
      const admin = await userRepository.getAdmin();
      if (admin) {
        await notificationRepository.addNotification(
          admin._id as string,
          ENotification.courseApprovalRequest
        );
        const adminSocket = SocketClass.SocketUsers[admin._id as string];
        if (adminSocket) {
          adminSocket.emit(
            "fromServerCourseAdded",
            courseResutl.data as ICourse,
            "new course request has been made"
          );
        }
      }
    }
    return courseResutl;
  } catch (error) {
    catchError(error, next);
  }
};
