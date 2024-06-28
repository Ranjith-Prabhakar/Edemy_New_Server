"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesRepository = void 0;
const messages_1 = require("../models/messages");
class MessagesRepository {
    async addMessages(courseId, senderId, message) {
        try {
            const result = await messages_1.messagesModel.create({
                courseId,
                senderId,
                message,
            });
            const populatedMessage = await messages_1.messagesModel
                .findById(result._id)
                .populate({
                path: "senderId",
                model: "user",
                select: "name",
            })
                .exec();
            return populatedMessage;
        }
        catch (error) {
            throw error;
        }
    }
    async getMessages(courseId) {
        try {
            const result = await messages_1.messagesModel
                .find({ courseId })
                .populate({
                path: "senderId",
                model: "user",
                select: "name",
            })
                .exec();
            return result;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.MessagesRepository = MessagesRepository;
//# sourceMappingURL=messages.js.map