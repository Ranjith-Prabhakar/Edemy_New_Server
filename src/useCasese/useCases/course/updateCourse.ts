import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICourseRepository } from "../../interface/repository/courseRepository";
import { ICourseResponse } from "../../interface/response/courseResponse";
import { ICloudStorage } from "../../interface/services/cloudStorage";
import ErrorHandler from "../../middlewares/errorHandler";

export const updateCourse = async(cloudStorage:ICourseRepository,req: Req, next: Next): Promise<ICourseResponse | void>=>{
try {
  return await cloudStorage.updateCourse(req.user?._id as string,req.body)
} catch (error:any) {
  return next(new ErrorHandler(500, error.message));
}
}