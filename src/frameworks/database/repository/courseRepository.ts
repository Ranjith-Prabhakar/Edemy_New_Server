import { ICourse } from "../../../entities/course";
import { ICourseRepository } from "../../../useCasese/interface/repository/courseRepository";
import { IModuleVideoBody } from "../../../useCasese/interface/request/course";
import { ICourseCategoryBaseResponse, ICourseResponse } from "../../../useCasese/interface/request_And_Response/course";

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
import * as courseRepositoryEngine from "./courseRepository/index"
export class CourseRepository implements ICourseRepository {
  constructor() {}
  async getCourseInProgress(instructor: string): Promise<ICourseResponse> {
    try {
      return await courseRepositoryEngine.getCourseInProgress(instructor);
    } catch (error) {
      throw error;
    }
  }
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async addCourseData(courseData: ICourse): Promise<ICourseResponse> {
    try {
      return await courseRepositoryEngine.addCourseData(courseData);
    } catch (error) {
      throw error;
    }
  }
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888

  async updateCourse(
    instructor: string,
    datum: { [key: string]: string }
  ): Promise<ICourseResponse> {
    try {
      return await courseRepositoryEngine.updateCourse(instructor, datum);
    } catch (error) {
      throw error;
    }
  }
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async addModuleVideos(
    data: IModuleVideoBody,
    instructor: string
  ): Promise<ICourseResponse> {
    try {
      return await courseRepositoryEngine.addModuleVideos(data, instructor);
    } catch (error) {
      throw error;
    }
  }
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async findByName(courseName: string): Promise<string | void> {
    try {
      return await courseRepositoryEngine.findByName(courseName);
    } catch (error) {
      throw error;
    }
  }
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async getCourses(): Promise<void | ICourseResponse> {
    try {
      return await courseRepositoryEngine.getCourses();
    } catch (error) {
      throw error;
    }
  }

  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async getCoursesInRequest(): Promise<void | ICourseResponse> {
    try {
      return await courseRepositoryEngine.getCoursesInRequest();
    } catch (error) {
      throw error;
    }
  }
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async approveOrRejectVideo(
    courseId: string,
    action: string
  ): Promise<void | ICourseResponse> {
    try {
      return await courseRepositoryEngine.approveOrRejectVideo(
        courseId,
        action
      );
    } catch (error) {
      throw error;
    }
  }
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async getCoursesForUser(): Promise<void | ICourseResponse> {
    try {
      return await courseRepositoryEngine.getCoursesForUser();
    } catch (error) {
      throw error;
    }
  }
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async isPreview(
    courseId: string,
    moduleNo: string,
    videoNo: string
  ): Promise<boolean> {
    try {
      return await courseRepositoryEngine.isPreview(
        courseId,
        moduleNo,
        videoNo
      );
    } catch (error) {
      throw error;
    }
  }
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async updatePurchas(courseId: string): Promise<boolean | void> {
    try {
      return await courseRepositoryEngine.updatePurchas(courseId);
    } catch (error) {
      throw error;
    }
  }
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async getUserEnrolledCourses(
    courses: string[]
  ): Promise<void | ICourseResponse> {
    try {
      return await courseRepositoryEngine.getUserEnrolledCourses(courses);
    } catch (error) {
      throw error;
    }
  }
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async getCourseByCategory(
    category: string,
    pageNumber: number,
    frequency: number,
    sort: string,
    filter: string
  ): Promise<void | ICourseCategoryBaseResponse> {
    try {
      return await courseRepositoryEngine.getCourseByCategory(
        category,
        pageNumber,
        frequency,
        sort,
        filter
      );
    } catch (error) {
      throw error;
    }
  }
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async getCourseForSearch(
    key: string,
    pageNumber: number,
    frequency: number,
    sort: string,
    filter: string
  ): Promise<void | ICourseCategoryBaseResponse> {
    try {
      return await courseRepositoryEngine.getCourseForSearch(
        key,
        pageNumber,
        frequency,
        sort,
        filter
      );
    } catch (error) {
      throw error;
    }
  }
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async getInstructorTutorials(
    courses: string[]
  ): Promise<void | ICourseResponse> {
    try {
      return await courseRepositoryEngine.getInstructorTutorials(courses);
    } catch (error) {
      throw error;
    }
  }
  // 88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
  async monthlySaleAndRevenue_Statistics(): Promise<void | { month: string; sale: string; revenue: string; }[]> {
    try {
      return await courseRepositoryEngine.monthlySaleAndRevenue_Statistics();
    } catch (error) {
      throw error
    }
  }
}
