"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addChat = void 0;
const catchError_1 = require("../../middlewares/catchError");
const StaticClassProperty_1 = require("../../staticClassProperty/StaticClassProperty");
const addChat = async (messagesRepository, conversationRepository, req, next) => {
    try {
        const authenticatedUser = await conversationRepository.authorisedUser(req.user?._id);
        if (authenticatedUser) {
            const messageRepoResult = await messagesRepository.addMessages(req.body.courseId, req.user?._id, req.body.message);
            if (messageRepoResult) {
                const conversationRepoResult = await conversationRepository.addMessage(req.body.courseId, req.user?._id, messageRepoResult._id);
                const newConversationRepoResult = conversationRepoResult;
                newConversationRepoResult.participants?.map((item) => {
                    StaticClassProperty_1.SocketClass.SocketUsers[item[0]]?.emit("fromServerCommunityChatNewChatMessage", messageRepoResult);
                });
                //
                return {
                    success: true,
                    message: "message has been added",
                    data: { message: messageRepoResult },
                };
            }
        }
        else {
            return { success: false, message: "un-authorised user" };
        }
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.addChat = addChat;
//# sourceMappingURL=addChat.js.map