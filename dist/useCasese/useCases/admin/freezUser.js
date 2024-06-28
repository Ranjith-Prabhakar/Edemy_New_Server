"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.freezUser = void 0;
const catchError_1 = require("../../middlewares/catchError");
const freezUser = async (userRepository, req, next) => {
    try {
        return await userRepository.freezUser(req.params.id);
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.freezUser = freezUser;
//# sourceMappingURL=freezUser.js.map