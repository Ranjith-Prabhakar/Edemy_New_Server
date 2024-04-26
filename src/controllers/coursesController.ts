import { Next, Req, Res } from "../frameworks/types/serverPackageTypes";
import { ICourseUseCase } from "../useCasese/interface/useCase/courseUseCase";
import { catchError } from "../useCasese/middlewares/catchError";
import { inputValidation } from "./middleware/inputValidation";

export class CoursesController {
  private readonly courseUseCase: ICourseUseCase;
  constructor(courseUseCase: ICourseUseCase) {
    this.courseUseCase = courseUseCase;
  }

  async getCourseInProgress(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "getCourseInProgress", next);
      const result = await this.courseUseCase.getCourseInProgress(req, next);
      res.status(200).json(result);
    } catch (error) {
      catchError(error, next);
    }
  }

  async addCourseData(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "addCourseData", next);
      const result = await this.courseUseCase.addCourseData(req, next);
      res.status(200).json(result);
    } catch (error) {
      catchError(error, next);
    }
  }

  async addFileToCloud(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "addFileToCloud", next);
      const result = await this.courseUseCase.addFileToCloud(req, next);
      res.status(200).json(result);
    } catch (error) {
      catchError(error, next);
    }
  }

  async updateCourse(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "updateCourse", next);
      const result = await this.courseUseCase.updateCourse(req, next);
      res.status(200).json(result);
    } catch (error) {
      catchError(error, next);
    }
  }

  async addModuleVideos(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "addModuleVideos", next);
      const result = await this.courseUseCase.addModuleVideos(req, next);
      res.status(200).json(result);
    } catch (error) {
      catchError(error, next);
    }
  }

  async getCourses(req: Req, res: Res, next: Next) {
    try {
      const result = await this.courseUseCase.getCourses(req, next);
      res.status(200).json(result);
    } catch (error) {
      catchError(error, next);
    }
  }

  async getCoursesInRequest(req: Req, res: Res, next: Next) {
    try {
      const result = await this.courseUseCase.getCoursesInRequest(req, next);
      res.status(200).json(result);
    } catch (error) {
      catchError(error, next);
    }
  }

  async getVideoPresignedUrl(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "getVideoPresignedUrl", next);
      const result = await this.courseUseCase.getVideoPresignedUrl(req, next);
      res.status(200).json(result);
    } catch (error) {
      catchError(error, next);
    }
  }

  async approveOrRejectVideo(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "approveOrRejectVideo", next);
      const result = await this.courseUseCase.approveOrRejectVideo(req, next);
      res.status(200).json(result);
    } catch (error) {
      catchError(error, next);
    }
  }

  async getCoursesForUser(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "getCoursesForUser", next);
      const result = await this.courseUseCase.getCoursesForUser(req, next);
      res.status(200).json(result);
    } catch (error) {
      catchError(error, next);
    }
  }

  async getCategories(req: Req, res: Res, next: Next) {
    try {
      const result = await this.courseUseCase.getCategories(req, next);
      res.status(200).json({
        success: true,
        message: "categories fectched successfully",
        data: result,
      });
    } catch (error) {
      catchError(error, next);
    }
  }

  async getVideoForUser(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "getVideoForUser", next);
      const result = await this.courseUseCase.getVideoForUser(req, next);
      if (result) res.status(200).json(result);
    } catch (error) {
      catchError(error, next);
    }
  }

  async getVideoForVisitors(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "getVideoForVisitors", next);
      const result = await this.courseUseCase.getVideoForVisitors(req, next);
      if (result) res.status(200).json(result);
    } catch (error) {
      catchError(error, next);
    }
  }

  async enrollCourse(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "enrollCourse", next);
      const result = await this.courseUseCase.enrollCourse(req, next);
      if (result) res.status(200).json(result);
    } catch (error) {
      catchError(error, next);
    }
  }
  async paymentStatus(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "paymentStatus", next);
      const result = await this.courseUseCase.paymentStatus(req, next);
      if (result) res.status(200).json(result);
    } catch (error) {
      catchError(error, next);
    }
  }

  async updateReviewAndRating(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "updateReviewAndRating", next);
      const result = await this.courseUseCase.updateReviewAndRating(req, next);
      if (result) res.status(200).json(result);
    } catch (error) {
      catchError(error, next);
    }
  }

  async getSingleCourseReviewAndRating(req: Req, res: Res, next: Next) {
    try {
      const result = await this.courseUseCase.getSingleCourseReviewAndRating(
        req,
        next
      );
      if (result) res.status(200).json(result);
    } catch (error) {
      catchError(error, next);
    }
  }

  async getThumbnamilImagePresignedUrl(req: Req, res: Res, next: Next) {
    try {
      const result = await this.courseUseCase.getThumbnamilImagePresignedUrl(
        req,
        next
      );
      if (result) res.status(200).json(result);
    } catch (error) {
      catchError(error, next);
    }
  }

  async getUserEnrolledCourses(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "getUserEnrolledCourses", next);
      const result = await this.courseUseCase.getUserEnrolledCourses(req, next);
      if (result) res.status(200).json(result);
    } catch (error) {
      catchError(error, next);
    }
  }

  async getCourseByCategory(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "getCourseByCategory", next);
      const result = await this.courseUseCase.getCourseByCategory(req, next);
      if (result) res.status(200).json(result);
    } catch (error) {
      catchError(error, next);
    }
  }

  async getCourseForSearch(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "getCourseForSearch", next);
      const result = await this.courseUseCase.getCourseForSearch(req, next);

      if (result) res.status(200).json(result);
    } catch (error) {
      catchError(error, next);
    }
  }

  async getInstructorTutorials(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "getInstructorTutorials", next);
      const result = await this.courseUseCase.getInstructorTutorials(req, next);
      if (result) res.status(200).json(result);
    } catch (error) {
      catchError(error, next);
    }
  }

  async setVideoTrack(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "setVideoTrack", next);
      const result = await this.courseUseCase.setVideoTrack(req, next);
      if (result) res.status(200).json(result);
    } catch (error) {
      catchError(error, next);
    }
  }
}
