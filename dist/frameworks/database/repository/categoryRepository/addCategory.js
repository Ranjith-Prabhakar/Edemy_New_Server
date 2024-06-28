"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCategory = void 0;
const categoryModel_1 = __importDefault(require("../../models/categoryModel"));
const addCategory = async (category) => {
    try {
        return await categoryModel_1.default.create({ name: category });
    }
    catch (error) {
        throw error;
    }
};
exports.addCategory = addCategory;
//# sourceMappingURL=addCategory.js.map