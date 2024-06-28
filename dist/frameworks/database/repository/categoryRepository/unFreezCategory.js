"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unFreezCategory = void 0;
const categoryModel_1 = __importDefault(require("../../models/categoryModel"));
const unFreezCategory = async (id) => {
    try {
        const result = await categoryModel_1.default.findByIdAndUpdate(id, { status: "active" }, { new: true });
        return {
            status: 200,
            message: "category has been un-blocked",
            data: result,
        };
    }
    catch (error) {
        throw error;
    }
};
exports.unFreezCategory = unFreezCategory;
//# sourceMappingURL=unFreezCategory.js.map