"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const catchError_1 = require("../../middlewares/catchError");
const getUser = async (userRepository, req, next) => {
    try {
        const id = req.params.id;
        return await userRepository.getUser(id);
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.getUser = getUser;
//# sourceMappingURL=getUser.js.map