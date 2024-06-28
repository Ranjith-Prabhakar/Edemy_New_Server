"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRepository = void 0;
const paymentModel_1 = __importDefault(require("../models/paymentModel"));
class PaymentRepository {
    async createCollection(paymentData, userId) {
        try {
            const result = await paymentModel_1.default.create({ ...paymentData, userId });
            if (result)
                return true;
            return false;
        }
        catch (error) {
            throw error;
        }
    }
    async findAndDelete(userId) {
        try {
            const result = (await paymentModel_1.default.findOneAndDelete({ userId }));
            return result;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.PaymentRepository = PaymentRepository;
//# sourceMappingURL=paymentRepository.js.map