"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoursesForUser = void 0;
const courseModel_1 = __importDefault(require("../../models/courseModel"));
const getCoursesForUser = async () => {
    try {
        const result = await courseModel_1.default
            .find({ status: "approved" })
            .sort({ createdAt: -1 })
            .limit(4);
        return { status: 200, message: "courses have been fetched", data: result };
    }
    catch (error) {
        throw error;
    }
};
exports.getCoursesForUser = getCoursesForUser;
// import { ICourseResponse } from "../../../../useCasese/interface/request_And_Response/course";
// import courseModel from "../../models/courseModel";
// export const getCoursesForUser = async (): Promise<void | ICourseResponse> => {
//   try {
//     const result = await courseModel.find({ status: "approved" }).limit(4);
//     return { status: 200, message: "courses have been fetched", data: result };
//   } catch (error) {
//     throw error;
//   }
// };
//# sourceMappingURL=getCoursesForUser.js.map