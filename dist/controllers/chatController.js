"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const catchError_1 = require("../useCasese/middlewares/catchError");
class ChatController {
    chatUseCase;
    constructor(chatUseCase) {
        this.chatUseCase = chatUseCase;
    }
    // ----------------------------------
    async addChat(req, res, next) {
        try {
            const result = await this.chatUseCase.addChat(req, next);
            res.status(200).json({ result });
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // ----------------------------
    async getChat(req, res, next) {
        try {
            const result = await this.chatUseCase.getChat(req, next);
            res.status(200).json({ result });
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    // ----------------------------
    async getOnlineUsers(req, res, next) {
        try {
            const result = await this.chatUseCase.getOnlineUsers(req, next);
            res.status(200).json({ result });
        }
        catch (error) {
            (0, catchError_1.catchError)(error, next);
        }
    }
    ;
}
exports.ChatController = ChatController;
//# sourceMappingURL=chatController.js.map