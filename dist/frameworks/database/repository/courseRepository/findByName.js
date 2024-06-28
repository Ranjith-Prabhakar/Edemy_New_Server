"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByName = void 0;
const courseModel_1 = __importDefault(require("../../models/courseModel"));
const findByName = async (courseName) => {
    try {
        const result = await courseModel_1.default.findOne({ courseName });
        if (result)
            return "a course already exist in this name";
        return;
    }
    catch (error) {
        throw error;
    }
};
exports.findByName = findByName;
//# sourceMappingURL=findByName.js.map