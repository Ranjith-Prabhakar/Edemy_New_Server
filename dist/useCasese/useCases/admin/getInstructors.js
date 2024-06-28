"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstructors = void 0;
const catchError_1 = require("../../middlewares/catchError");
const getInstructors = async (userRepository, req, next) => {
    try {
        return await userRepository.getUsers("instructor", parseInt(req.body.pageNo));
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.getInstructors = getInstructors;
//# sourceMappingURL=getInstructors.js.map