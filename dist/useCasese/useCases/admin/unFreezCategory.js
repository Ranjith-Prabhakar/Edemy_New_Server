"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unFreezCategory = void 0;
const catchError_1 = require("../../middlewares/catchError");
const unFreezCategory = async (req, next, categoryrepository) => {
    try {
        return await categoryrepository.unFreezCategory(req.params.id);
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.unFreezCategory = unFreezCategory;
//# sourceMappingURL=unFreezCategory.js.map