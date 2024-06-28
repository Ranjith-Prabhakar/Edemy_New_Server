"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.freezCategory = void 0;
const catchError_1 = require("../../middlewares/catchError");
const freezCategory = async (req, next, categoryrepository) => {
    try {
        return await categoryrepository.freezCategory(req.params.id);
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.freezCategory = freezCategory;
//# sourceMappingURL=freezCategory.js.map