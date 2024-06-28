"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByIdAndUpdate = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const findByIdAndUpdate = async (id, data) => {
    const result = await userModel_1.default.findByIdAndUpdate(id, data, { new: true });
    if (result) {
        return {
            status: 200,
            success: true,
            message: "user password has been updated",
        };
    }
    else {
        return {
            status: 400,
            success: false,
            message: "user not found",
        };
    }
};
exports.findByIdAndUpdate = findByIdAndUpdate;
//# sourceMappingURL=findByIdAndUpdate.js.map