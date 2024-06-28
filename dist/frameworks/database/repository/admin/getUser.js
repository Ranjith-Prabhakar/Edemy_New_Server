"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const getUser = async (id) => {
    try {
        return (await userModel_1.default.findOne({
            _id: id,
            role: { $eq: "user" },
        }));
    }
    catch (error) {
        throw error;
    }
};
exports.getUser = getUser;
//# sourceMappingURL=getUser.js.map