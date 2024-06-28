"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addModuleVideos = void 0;
const catchError_1 = require("../../middlewares/catchError");
const addModuleVideos = async (courseRepository, req, next) => {
    try {
        return courseRepository.addModuleVideos(req.body, req.user?._id);
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.addModuleVideos = addModuleVideos;
//# sourceMappingURL=addModuleVideos.js.map