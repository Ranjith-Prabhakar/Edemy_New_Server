"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationRepository = void 0;
const conversation_1 = require("../models/conversation");
const userModel_1 = __importDefault(require("../models/userModel"));
class ConversationRepository {
    async addMessage(courseId, senderId, messageId) {
        try {
            const result = await conversation_1.conversationModel.findOneAndUpdate({ courseId: courseId, participants: { $in: [senderId] } }, { $push: { messages: messageId } }, { returnOriginal: false, timestamps: true });
            if (result) {
                const usersList = await conversation_1.conversationModel.find({}, { participants: true, _id: 0 });
                if (usersList) {
                    const newUserList = usersList[0].participants;
                    return {
                        success: true,
                        message: "message has been updated",
                        participants: newUserList,
                    };
                }
            }
        }
        catch (error) {
            throw error;
        }
    }
    // --------------------------------------
    async addParticipants(courseId, participantId) {
        try {
            const result = await conversation_1.conversationModel.findOneAndUpdate({ courseId }, { $push: { participants: participantId } }, { upsert: true, returnOriginal: false, timestamps: true });
            if (result)
                return result;
        }
        catch (error) {
            throw error;
        }
    }
    // --------------------------------------
    async authorisedUser(userId) {
        try {
            const result = await conversation_1.conversationModel.findOne({
                participants: { $in: [userId] },
            });
            if (result)
                return true;
            else
                return false;
        }
        catch (error) {
            throw error;
        }
    }
    // --------------------------------------
    // async getUsersList(courseId: string): Promise<IOnlineUsersResponse | void> {
    //   try {
    //     const conversations = await conversationModel.find(
    //       { courseId },
    //       { participants: 1, _id: 0 }
    //     );
    //     const users = await userModel.find(
    //       { _id: { $in: conversations[0].participants } },
    //       "_id name"
    //     );
    //     if (users) {
    //       return {
    //         success: true,
    //         message: "online users have been fetched",
    //         data: users as unknown as TOnlineUsers,
    //       };
    //     }
    //   } catch (error) {
    //     throw error;
    //   }
    // }
    async getUsersList(courseId) {
        try {
            const conversations = await conversation_1.conversationModel.find({ courseId }, { participants: 1, _id: 0 });
            const users = await userModel_1.default.find({ _id: { $in: conversations[0].participants } }, "_id name");
            if (users) {
                return {
                    success: true,
                    message: "online users have been fetched",
                    data: { allUsers: users },
                };
            }
        }
        catch (error) {
            throw error;
        }
    }
    // --------------------------------------
    async getUsersFromAllConversationForLoginAndLogout(userId) {
        try {
            const result = await conversation_1.conversationModel.find({ participants: { $in: [userId] } }, { participants: 1, _id: 0 });
            const flatArray = result.map((items) => items.participants.flat());
            const uniqueArray = [...new Set(flatArray.flat())];
            return uniqueArray; // it will have the user it self so when sending notification
            // have to eliminate it
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ConversationRepository = ConversationRepository;
//# sourceMappingURL=conversation.js.map