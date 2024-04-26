import { Req, Res, Next } from "../frameworks/types/serverPackageTypes";
import { inputValidation } from "./middleware/inputValidation";
import { IAdminUseCase } from "../useCasese/interface/useCase/adminUseCase";
import { catchError } from "../useCasese/middlewares/catchError";
import { IInstructorAgreementResponse } from "../useCasese/interface/request_And_Response/instructorAgreement";

export class AdminController {
  private readonly adminUseCase: IAdminUseCase;

  constructor(adminUseCase: IAdminUseCase) {
    this.adminUseCase = adminUseCase;
  }
  // *****************************************************************************************************************************
  async approveOrRejectInstructor(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "approveInstructor", next);
      const result = (await this.adminUseCase.approveOrRejectInstructor(
        req,
        next
      )) as IInstructorAgreementResponse;
      res.status(result.status as number).json(result);
    } catch (error) {
      catchError(error, next);
    }
  }
  // *****************************************************************************************************************************
  async instructorRequests(req: Req, res: Res, next: Next) {
    try {
      const result = await this.adminUseCase.instructorRequests(next);
      res.status(200).json(result);
    } catch (error) {
      catchError(error, next);
    }
  }

  // *****************************************************************************************************************************
  async getUsers(req: Req, res: Res, next: Next) {
    try {
      const result = await this.adminUseCase.getUsers(req,next);
      res.status(200).json({
        success: true,
        message: "users have been fetched successfully ",
        data: result,
      });
    } catch (error) {
      catchError(error, next);
    }
  }
  // *****************************************************************************************************************************
  async getUser(req: Req, res: Res, next: Next) {
    try {
      const result = await this.adminUseCase.getUser(req, next);
      res.status(200).json({
        success: true,
        message: "user have been fetched successfully",
        user: result,
      });
    } catch (error) {
      catchError(error, next);
    }
  }
  // *****************************************************************************************************************************
  async freezUser(req: Req, res: Res, next: Next) {
    try {
      const result = await this.adminUseCase.freezUser(req, next);
      res.status(200).json(result);
    } catch (error) {
      catchError(error, next);
    }
  }
  // *****************************************************************************************************************************
  async unFreezUser(req: Req, res: Res, next: Next) {
    try {
      const result = await this.adminUseCase.unFreezUser(req, next);
      res.status(200).json(result);
    } catch (error) {
      catchError(error, next);
    }
  }
  // *****************************************************************************************************************************
  async getInstructors(req: Req, res: Res, next: Next) {
    try {
      const result = await this.adminUseCase.getInstructors(req, next);
      res.status(200).json({
        success: true,
        message: "instructors have been fetched successfully",
        data: result,
      });
    } catch (error) {
      catchError(error, next);
    }
  }
  // *****************************************************************************************************************************
  async addCategory(req: Req, res: Res, next: Next) {
    try {
      await inputValidation(req, "addCategory", next);
      const result = await this.adminUseCase.addCategory(req, next);
      res.status(200).json(result);
    } catch (error) {
      catchError(error, next);
    }
  }
  // *****************************************************************************************************************************
  async getCategories(req: Req, res: Res, next: Next) {
    try {
      const result = await this.adminUseCase.getCategories(next);
      res.status(200).json({
        success: true,
        message: "data fetched successfully",
        data: result,
      });
    } catch (error) {
      catchError(error, next);
    }
  }
  // *****************************************************************************************************************************
  async freezCategory(req: Req, res: Res, next: Next) {
    try {
      const result = await this.adminUseCase.freezCategory(req, next);
      res.status(200).json(result);
    } catch (error) {
      catchError(error, next);
    }
  }
  // *****************************************************************************************************************************
  async unFreezCategory(req: Req, res: Res, next: Next) {
    try {
      const result = await this.adminUseCase.unFreezCategory(req, next);
      res.status(200).json(result);
    } catch (error) {
      catchError(error, next);
    }
  }
  // *****************************************************************************************************************************
  async getStatistics(req: Req, res: Res, next: Next) {
    try {
      const result = await this.adminUseCase.getStatistics(next);
      res.status(200).json(result);
    } catch (error) {
      catchError(error, next);
    }
  }
}
