"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = void 0;
const catchError_1 = require("../../middlewares/catchError");
const getCategories = async (categoryRepository, req, next) => {
    try {
        if (req.user?.role === "admin") {
            return await categoryRepository.getCategories(true);
        }
        else {
            return await categoryRepository.getCategories(false);
        }
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.getCategories = getCategories;
//# sourceMappingURL=getCategories.js.map