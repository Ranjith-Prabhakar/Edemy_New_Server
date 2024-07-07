"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = void 0;
const catchError_1 = require("../../middlewares/catchError");
const refresh = async (cloudSession, jwtToken, req, next) => {
    try {
        console.log('inside refresh engine useCase');
        const token = await jwtToken.createAccessAndRefreshToken(req.user?._id);
        await cloudSession.createUserSession(req.user?._id, req.user);
        return token;
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.refresh = refresh;
//# sourceMappingURL=refresh.js.map