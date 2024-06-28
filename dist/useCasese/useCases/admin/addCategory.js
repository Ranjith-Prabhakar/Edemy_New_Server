"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCategory = void 0;
const catchError_1 = require("../../middlewares/catchError");
const addCategory = async (categoryRepository, req, next) => {
    try {
        const isExist = await categoryRepository.existCategory(req.body.category);
        if (isExist === "exist") {
            return { success: false, message: "category already exist" };
        }
        else {
            const result = await categoryRepository.addCategory(req.body.category);
            return {
                data: result,
                success: true,
                message: "category added successfully",
            };
        }
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.addCategory = addCategory;
//# sourceMappingURL=addCategory.js.map