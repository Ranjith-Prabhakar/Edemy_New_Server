"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const messagesSchema = new mongoose_1.default.Schema({
    courseId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, "please enter a valid courseId"],
    },
    senderId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "please enter a valid senderId"],
    },
    message: {
        type: String,
        required: [true, "please enter a valid courseId"],
    },
}, { timestamps: true });
exports.messagesModel = mongoose_1.default.model("message", messagesSchema);
//# sourceMappingURL=messages.js.map