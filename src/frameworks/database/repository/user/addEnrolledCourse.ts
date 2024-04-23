import { IUser } from "../../../../entities/user";
import userModel from "../../models/userModel";

export const addEnrolledCourse = async (
  courseId: string,
  userId: string
): Promise<IUser | void> => {
  try {
    const result = (await userModel.findOneAndUpdate(
      { _id: userId },
      { $addToSet:{enrolledCourses: courseId } },
      { returnDocument: "after" }
    )) as IUser;
    return result
  } catch (error) {
    throw error;
  }
};
