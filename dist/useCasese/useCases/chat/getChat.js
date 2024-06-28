"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChat = void 0;
const catchError_1 = require("../../middlewares/catchError");
const getChat = async (messagesRepository, conversationRepository, req, next) => {
    try {
        const authorisedUser = await conversationRepository.authorisedUser(req.user?._id);
        if (authorisedUser) {
            const messages = await messagesRepository.getMessages(req.body.courseId);
            if (messages) {
                return {
                    success: true,
                    message: "messeges found",
                    data: { messages },
                };
            }
            else {
                return {
                    success: false,
                    message: "messeges not found",
                };
            }
        }
        else {
            return {
                success: true,
                message: "user not found",
            };
        }
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.getChat = getChat;
//# sourceMappingURL=getChat.js.map