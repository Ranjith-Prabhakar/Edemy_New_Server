"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.freezUser = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const freezUser = async (id) => {
    try {
        const result = await userModel_1.default.findByIdAndUpdate(id, { status: "frozen" }, { new: true });
        return { success: true, message: "user has been blocked", data: result };
    }
    catch (error) {
        throw error;
    }
};
exports.freezUser = freezUser;
//# sourceMappingURL=freezUser.js.map