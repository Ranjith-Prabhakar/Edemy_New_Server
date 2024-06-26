"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const notificationSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: [true, "provide a user Id"] },
    instructorRequests: {
        type: String,
    },
    instructorRequestApproval: {
        type: String,
    },
    instructorRequestRejection: {
        type: String,
    },
    courseApprovalRequest: {
        type: String,
    },
    courseApprovalApprovance: {
        type: String,
    },
    courseApprovalRejection: {
        type: String,
    },
    broadCasting: [],
});
const notificationModel = mongoose_1.default.model("notification", notificationSchema);
exports.default = notificationModel;
//# sourceMappingURL=notificationModel.js.map