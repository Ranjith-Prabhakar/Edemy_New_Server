"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.monthlySaleAndRevenue_Statistics = void 0;
const courseModel_1 = __importDefault(require("../../models/courseModel"));
const monthlySaleAndRevenue_Statistics = async () => {
    try {
        const result = await courseModel_1.default.aggregate([
            {
                $match: {
                    status: "approved", // Filter for approved courses
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                    },
                    sale: { $sum: "$noOfPurchase" }, // Sum of noOfPurchase for each month
                    revenue: { $sum: { $multiply: ["$noOfPurchase", "$price"] } }, // Total revenue for each month
                },
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id.month",
                    revenue: 1,
                    sale: 1,
                },
            },
        ]);
        return result;
    }
    catch (error) {
        throw error;
    }
};
exports.monthlySaleAndRevenue_Statistics = monthlySaleAndRevenue_Statistics;
//# sourceMappingURL=monthlySaleAndRevenue_Statistics.js.map