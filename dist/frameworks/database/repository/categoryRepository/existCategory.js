"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.existCategory = void 0;
const categoryModel_1 = __importDefault(require("../../models/categoryModel"));
const existCategory = async (category) => {
    try {
        const result = await categoryModel_1.default.findOne({ name: category });
        if (result) {
            return "exist";
        }
        else {
            return "not exist";
        }
    }
    catch (error) {
        throw error;
    }
};
exports.existCategory = existCategory;
//# sourceMappingURL=existCategory.js.map