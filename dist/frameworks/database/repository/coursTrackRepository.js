"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseTrackRepository = void 0;
const courseTrackingModel_1 = __importDefault(require("../models/courseTrackingModel"));
class CourseTrackRepository {
    async setVideoTracking(videoData) {
        try {
            const { userId, courseId, moduleNo, moduleTittle, videoNo, videoTittle, position, complete, } = videoData;
            const isCourseExist = await courseTrackingModel_1.default.findOne({
                courseId,
                userId,
            });
            if (isCourseExist) {
                //if course for this user already added into the tracking
                const isModuleExist = isCourseExist.modules?.find((module) => module.moduleNo === moduleNo.toString());
                if (isModuleExist) {
                    // if the module exist already
                    const isVideoExist = isModuleExist.videos.some((video) => video.videoNo === videoNo.toString());
                    if (isVideoExist) {
                        // if the video also exist already in the list then update
                        const update = await courseTrackingModel_1.default.findOneAndUpdate({
                            courseId,
                            userId,
                            "modules.moduleNo": moduleNo,
                            "modules.moduleTittle": moduleTittle,
                            "modules.videos.videoNo": videoNo,
                            "modules.videos.videoTittle": videoTittle,
                        }, {
                            $set: {
                                "modules.$.videos.$[video].currentPosition": position,
                                "modules.$.videos.$[video].completed": complete,
                            },
                        }, {
                            arrayFilters: [{ "video.videoNo": videoNo }],
                            new: true,
                        });
                        if (update)
                            return {
                                success: true,
                                message: "course tracking has been updated",
                            };
                        else
                            return {
                                success: false,
                                message: "course tracking hasn`t been updated",
                            };
                    }
                    else {
                        // if the video not exist in the list add it
                        const update = await courseTrackingModel_1.default.updateOne({
                            courseId,
                            "modules.moduleNo": moduleNo,
                            "modules.moduleTittle": moduleTittle,
                        }, {
                            $addToSet: {
                                videos: [
                                    {
                                        videoNo,
                                        videoTittle,
                                        currentPosition: position,
                                        completed: complete,
                                    },
                                ],
                            },
                        });
                        if (update)
                            return {
                                success: true,
                                message: "course tracking has been updated",
                            };
                        else
                            return {
                                success: false,
                                message: "course tracking hasn`t been updated",
                            };
                    }
                }
                else {
                    // if the module not added to the video list
                    const update = await courseTrackingModel_1.default.updateOne({ courseId }, {
                        $addToSet: {
                            modules: {
                                moduleNo,
                                moduleTittle,
                                videos: [
                                    {
                                        videoNo,
                                        videoTittle,
                                        currentPosition: position,
                                        completed: complete,
                                    },
                                ],
                            },
                        },
                    });
                    if (update)
                        return {
                            success: true,
                            message: "course tracking has been updated",
                        };
                    else
                        return {
                            success: false,
                            message: "course tracking hasn`t been updated",
                        };
                }
            }
            else {
                //if course for this user not added into the tracking already
                const update = await courseTrackingModel_1.default.create({
                    courseId,
                    userId,
                    modules: [
                        {
                            moduleNo,
                            moduleTittle,
                            videos: {
                                videoNo,
                                videoTittle,
                                currentPosition: position,
                                completed: complete,
                            },
                        },
                    ],
                });
                if (update)
                    return {
                        success: true,
                        message: "course tracking has been updated",
                    };
                else
                    return {
                        success: false,
                        message: "course tracking hasn`t been updated",
                    };
            }
        }
        catch (error) {
            throw error;
        }
    }
    async getVideoTracking(courseId, userId, moduleNo, videoNo) {
        try {
            const document = await courseTrackingModel_1.default.findOne({
                courseId,
                userId,
                "modules.moduleNo": moduleNo,
                "modules.videos.videoNo": videoNo,
            });
            const position = document?.modules
                ?.find((module) => module.moduleNo === moduleNo.toString())
                ?.videos.find((video) => video.videoNo === videoNo.toString())?.currentPosition;
            return { position: position };
        }
        catch (error) {
            throw error;
        }
    }
}
exports.CourseTrackRepository = CourseTrackRepository;
//# sourceMappingURL=coursTrackRepository.js.map