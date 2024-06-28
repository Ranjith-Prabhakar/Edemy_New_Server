"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdmin = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const getAdmin = async () => {
    try {
        return await userModel_1.default.findOne({ role: "admin" });
    }
    catch (error) {
        throw error;
    }
};
exports.getAdmin = getAdmin;
//# sourceMappingURL=getAdmin.js.map