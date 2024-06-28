"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstrctorAgreementRepository = void 0;
const notification_1 = require("../../../entities/notification");
const instructorAgreementModel_1 = __importDefault(require("../models/instructorAgreementModel"));
class InstrctorAgreementRepository {
    // ******************************************************************************************
    async createAgreement(agreement) {
        try {
            const isExist = await instructorAgreementModel_1.default.findOne({
                userId: agreement.userId,
            });
            if (!isExist) {
                const result = await instructorAgreementModel_1.default.create(agreement);
                return {
                    status: 200,
                    success: true,
                    message: "request has been recorded",
                    agreement: result,
                };
            }
            else {
                return {
                    status: 400,
                    success: false,
                    message: "request has been made already and is in processs",
                };
            }
        }
        catch (error) {
            throw error;
        }
    }
    // ******************************************************************************************
    async getAgreements() {
        try {
            const result = await instructorAgreementModel_1.default.find({ status: "pending" });
            return {
                success: true,
                message: "instructors agreements have been fetched successfully",
                data: result,
            };
        }
        catch (error) {
            throw error;
        }
    }
    // ******************************************************************************************
    async updateStatus(userId, action) {
        try {
            const result = await instructorAgreementModel_1.default.findByIdAndUpdate(userId, {
                status: action,
            }, { new: true });
            if (result) {
                return {
                    status: 200,
                    success: true,
                    message: action === "approved"
                        ? notification_1.ENotificationMsg.instructorRequestApproval
                        : notification_1.ENotificationMsg.instructorRequestRejection,
                    data: result,
                };
            }
            else {
                return {
                    status: 404,
                    success: true,
                    message: "record not found",
                };
            }
        }
        catch (error) {
            return {
                status: 500,
                success: false,
                message: "error while fetching data from db",
            };
        }
    }
}
exports.InstrctorAgreementRepository = InstrctorAgreementRepository;
//# sourceMappingURL=instructorAgreementRepository.js.map