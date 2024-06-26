import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { ICourseRepository } from "../../interface/repository/courseRepository";
import { ICourseResponse } from "../../interface/request_And_Response/course";
import { catchError } from "../../middlewares/catchError";

export const approveOrRejectVideo =async(courseRepository:ICourseRepository,req:Req,next:Next): Promise<void | ICourseResponse>=>{
  try {
    const {courseId,action} = req.body
    return await courseRepository.approveOrRejectVideo(courseId,action)
  } catch (error) {
    catchError(error,next)
    
  }
} 