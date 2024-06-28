"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const catchError_1 = require("../../middlewares/catchError");
const getUsers = async (userRepository, req, next) => {
    try {
        return await userRepository.getUsers("user", parseInt(req.body.pageNo));
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.getUsers = getUsers;
//# sourceMappingURL=getUsers.js.map