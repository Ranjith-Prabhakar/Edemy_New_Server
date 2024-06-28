"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePurchas = void 0;
const courseModel_1 = __importDefault(require("../../models/courseModel"));
const updatePurchas = async (courseId) => {
    try {
        const result = await courseModel_1.default.findOneAndUpdate({ _id: courseId }, { $inc: { noOfPurchase: 1 } });
        return !!result;
    }
    catch (error) {
        throw error;
    }
};
exports.updatePurchas = updatePurchas;
//# sourceMappingURL=updatePurchas.js.map