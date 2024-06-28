"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gAuthUrl = void 0;
const catchError_1 = require("../../middlewares/catchError");
const gAuthUrl = async (authService, next) => {
    try {
        return await authService.getAuthUrl();
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.gAuthUrl = gAuthUrl;
//# sourceMappingURL=AuthUrl.js.map