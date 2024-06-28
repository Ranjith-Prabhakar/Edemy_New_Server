"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = void 0;
const categoryModel_1 = __importDefault(require("../../models/categoryModel"));
const getCategories = async (admin) => {
    try {
        if (admin) {
            return await categoryModel_1.default.find();
        }
        else {
            return await categoryModel_1.default.find({ status: "active" });
        }
    }
    catch (error) {
        throw error;
    }
};
exports.getCategories = getCategories;
//# sourceMappingURL=getCategories.js.map