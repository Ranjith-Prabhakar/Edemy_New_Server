"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setVideoTrack = void 0;
const catchError_1 = require("../../middlewares/catchError");
const setVideoTrack = async (courseTrackingRepository, req, next) => {
    try {
        const { userId, courseId, moduleNo, moduleTittle, videoNo, videoTittle, position, complete, } = req.body;
        const result = await courseTrackingRepository.setVideoTracking({
            userId,
            courseId,
            moduleNo,
            moduleTittle,
            videoNo,
            videoTittle,
            position,
            complete,
        });
        return result;
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.setVideoTrack = setVideoTrack;
//# sourceMappingURL=setVideoTrack.js.map