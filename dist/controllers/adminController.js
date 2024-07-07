"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const inputValidation_1 = require("./middleware/inputValidation");
const catchError_1 = require("../useCasese/middlewares/catchError");
class AdminController {
    adminUseCase;
    constructor(adminUseCase) {
        this.adminUseCase = adminUseCase;
    }
    // *****************************************************************************************************************************
    async approveOrRejectInstructor(req, res, next) {
        try {
            await (0, inputValidation_1.inputValidation)(req, "approveInstructor", next);
            const result = (await this.adminUseCase.approveOrRejectInstructor(req, next));
            res.status(result.status).json(result);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // *****************************************************************************************************************************
    async instructorRequests(req, res, next) {
        try {
            const result = await this.adminUseCase.instructorRequests(next);
            res.status(200).json(result);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // *****************************************************************************************************************************
    async getUsers(req, res, next) {
        try {
            const result = await this.adminUseCase.getUsers(req, next);
            res.status(200).json({
                success: true,
                message: "users have been fetched successfully ",
                data: result,
            });
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // *****************************************************************************************************************************
    async getUser(req, res, next) {
        try {
            const result = await this.adminUseCase.getUser(req, next);
            res.status(200).json({
                success: true,
                message: "user have been fetched successfully",
                user: result,
            });
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // *****************************************************************************************************************************
    async freezUser(req, res, next) {
        try {
            const result = await this.adminUseCase.freezUser(req, next);
            res.status(200).json(result);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // *****************************************************************************************************************************
    async unFreezUser(req, res, next) {
        try {
            const result = await this.adminUseCase.unFreezUser(req, next);
            res.status(200).json(result);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // *****************************************************************************************************************************
    async getInstructors(req, res, next) {
        try {
            const result = await this.adminUseCase.getInstructors(req, next);
            res.status(200).json({
                success: true,
                message: "instructors have been fetched successfully",
                data: result,
            });
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // *****************************************************************************************************************************
    async addCategory(req, res, next) {
        try {
            await (0, inputValidation_1.inputValidation)(req, "addCategory", next);
            const result = await this.adminUseCase.addCategory(req, next);
            res.status(200).json(result);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // *****************************************************************************************************************************
    async getCategories(req, res, next) {
        try {
            const result = await this.adminUseCase.getCategories(next);
            res.status(200).json({
                success: true,
                message: "data fetched successfully",
                data: result,
            });
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // *****************************************************************************************************************************
    async freezCategory(req, res, next) {
        try {
            const result = await this.adminUseCase.freezCategory(req, next);
            res.status(200).json(result);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // *****************************************************************************************************************************
    async unFreezCategory(req, res, next) {
        try {
            const result = await this.adminUseCase.unFreezCategory(req, next);
            res.status(200).json(result);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // *****************************************************************************************************************************
    async getStatistics(req, res, next) {
        try {
            const result = await this.adminUseCase.getStatistics(next);
            res.status(200).json(result);
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=adminController.js.map