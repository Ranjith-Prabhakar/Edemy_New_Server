"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unFreezUser = void 0;
const catchError_1 = require("../../middlewares/catchError");
const unFreezUser = async (userRepository, req, next) => {
    try {
        return await userRepository.unFreezUser(req.params.id);
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.unFreezUser = unFreezUser;
//# sourceMappingURL=unFreezUser.js.map