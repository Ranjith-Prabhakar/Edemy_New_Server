"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSession = void 0;
const catchError_1 = require("../../middlewares/catchError");
const userSession = async (req, next) => {
    try {
        return await req.user;
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.userSession = userSession;
//# sourceMappingURL=userSession.js.map