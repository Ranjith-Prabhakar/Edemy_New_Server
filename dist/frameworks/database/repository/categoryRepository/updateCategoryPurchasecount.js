"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategoryPurchasecount = void 0;
const categoryModel_1 = __importDefault(require("../../models/categoryModel"));
const updateCategoryPurchasecount = async (name) => {
    try {
        const result = await categoryModel_1.default.updateOne({ name: name }, { $inc: { noOfCourses: 1 } });
        if (result) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        throw error;
    }
};
exports.updateCategoryPurchasecount = updateCategoryPurchasecount;
//# sourceMappingURL=updateCategoryPurchasecount.js.map