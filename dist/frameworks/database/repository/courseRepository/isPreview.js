"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPreview = void 0;
const courseModel_1 = __importDefault(require("../../models/courseModel"));
const isPreview = async (courseId, moduleNo, videoNo) => {
    try {
        const result = await courseModel_1.default.findOne({
            _id: courseId,
            modules: {
                $elemMatch: {
                    moduleNo: moduleNo,
                    videos: {
                        $elemMatch: {
                            videoNo: videoNo,
                            preview: true,
                        },
                    },
                },
            },
        });
        if (result) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        throw error;
    }
};
exports.isPreview = isPreview;
//# sourceMappingURL=isPreview.js.map