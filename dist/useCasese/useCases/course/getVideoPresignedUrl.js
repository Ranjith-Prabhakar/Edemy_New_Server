"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideoPresignedUrl = void 0;
const catchError_1 = require("../../middlewares/catchError");
const getVideoPresignedUrl = async (cloudStorage, req, next) => {
    try {
        return await cloudStorage.getVideoPresignedUrl(req.body.videoName);
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.getVideoPresignedUrl = getVideoPresignedUrl;
//# sourceMappingURL=getVideoPresignedUrl.js.map