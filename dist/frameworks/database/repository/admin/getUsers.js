"use strict";
// import { IUser } from "../../../../entities/user";
// import userModel from "../../models/userModel";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const getUsers = async (role, pageNo) => {
    try {
        const start = (pageNo - 1) * 10;
        const end = start + 10;
        const [length, result] = await Promise.all([
            userModel_1.default.find({ role: { $eq: role } }).countDocuments(),
            userModel_1.default
                .find({ role: { $eq: role } })
                .skip(start)
                .limit(end),
        ]);
        return { permitedNext: Math.ceil(length / 10), data: result };
    }
    catch (error) {
        throw error;
    }
};
exports.getUsers = getUsers;
//# sourceMappingURL=getUsers.js.map