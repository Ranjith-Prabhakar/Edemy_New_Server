"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFileToCloud = void 0;
const catchError_1 = require("../../middlewares/catchError");
const addFileToCloud = async (cloudStorage, courseRepository, req, next) => {
    try {
        if (!req.body.fromAddModuleVideo) {
            const isCourseExist = await courseRepository.findByName(req.body.folderName);
            if (isCourseExist)
                return isCourseExist;
        }
        return await cloudStorage.addFileToCloud(req.body.fileName, req.body.contentType, req.body.userId, req.body.folderName);
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.addFileToCloud = addFileToCloud;
//# sourceMappingURL=addFileToCloud.js.map