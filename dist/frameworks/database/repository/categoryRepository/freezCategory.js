"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.freezCategory = void 0;
const categoryModel_1 = __importDefault(require("../../models/categoryModel"));
const freezCategory = async (id) => {
    try {
        const result = await categoryModel_1.default.findByIdAndUpdate(id, { status: "frozen" }, { new: true });
        return {
            status: 200,
            message: "category has been blocked",
            data: result,
        };
    }
    catch (error) {
        throw error;
    }
};
exports.freezCategory = freezCategory;
//# sourceMappingURL=freezCategory.js.map