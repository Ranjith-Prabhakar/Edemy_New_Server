"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseByCategory = void 0;
const courseModel_1 = __importDefault(require("../../models/courseModel"));
const getCourseByCategory = async (category, pageNumber, frequency, sort, filter) => {
    try {
        const sortValue = sort === "A-Z" ? -1 : 1;
        if (category === "all category") {
            const length = (await courseModel_1.default.find()).length;
            if (length) {
                const end = pageNumber * frequency;
                const start = end - frequency;
                const result = await courseModel_1.default
                    .find()
                    .sort({ [filter]: sortValue })
                    .skip(start)
                    .limit(end);
                return {
                    status: 200,
                    message: "couses have been fetched successfully",
                    hasMore: length - end > 0,
                    data: result,
                };
            }
            else {
                return {
                    hasMore: false,
                    message: "no courses for this category",
                    status: 400,
                };
            }
        }
        else {
            const length = (await courseModel_1.default.find({
                category: { $regex: new RegExp(category, "i") },
            })).length;
            if (length) {
                const end = pageNumber * frequency;
                const start = end - frequency;
                const result = await courseModel_1.default
                    .find({
                    category: { $regex: new RegExp(category, "i") },
                })
                    .sort({ [filter]: sortValue })
                    .skip(start)
                    .limit(end);
                return {
                    status: 200,
                    message: "couses have been fetched successfully",
                    hasMore: length - end > 0,
                    data: result,
                };
            }
            else {
                return {
                    hasMore: false,
                    message: "no courses for this category",
                    status: 400,
                };
            }
        }
    }
    catch (error) {
        throw error;
    }
};
exports.getCourseByCategory = getCourseByCategory;
//# sourceMappingURL=getCourseByCategory.js.map