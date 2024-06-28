"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unFreezUser = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const unFreezUser = async (id) => {
    try {
        const result = await userModel_1.default.findByIdAndUpdate(id, { status: "active" }, { new: true });
        return { success: true, message: "user has been un-blocked", data: result };
    }
    catch (error) {
        throw error;
    }
};
exports.unFreezUser = unFreezUser;
//# sourceMappingURL=unFreezUser.js.map