"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.topSellingCategories_Statistics = void 0;
const categoryModel_1 = __importDefault(require("../../models/categoryModel"));
const topSellingCategories_Statistics = async () => {
    try {
        const result = await categoryModel_1.default
            .find({}, { name: 1, noOfCourses: 1, _id: 0 })
            .sort({ noOfCourses: -1 })
            .limit(10);
        return result;
    }
    catch (error) {
        throw error;
    }
};
exports.topSellingCategories_Statistics = topSellingCategories_Statistics;
//# sourceMappingURL=topSellingCategories_Statistics.js.map