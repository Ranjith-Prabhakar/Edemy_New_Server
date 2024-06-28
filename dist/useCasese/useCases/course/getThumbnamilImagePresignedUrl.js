"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThumbnamilImagePresignedUrl = void 0;
const catchError_1 = require("../../middlewares/catchError");
const getThumbnamilImagePresignedUrl = async (cloudStorage, req, next) => {
    try {
        return await cloudStorage.getVideoPresignedUrl(req.body.thumbnail);
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.getThumbnamilImagePresignedUrl = getThumbnamilImagePresignedUrl;
//# sourceMappingURL=getThumbnamilImagePresignedUrl.js.map