"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = void 0;
const catchError_1 = require("../../middlewares/catchError");
const getCategories = async (categoryRepository, next) => {
    try {
        return await categoryRepository.getCategories(true);
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.getCategories = getCategories;
//# sourceMappingURL=getCategories.js.map