import { NextFunction } from "express";
import { Next, Req } from "../../frameworks/types/serverPackageTypes";
import { IConversationRepository } from "../interface/repository/conversation";
import { IMessagesRepository } from "../interface/repository/messages";
import { IMessageResposnse, IOnlineUsersResponse } from "../interface/request_And_Response/chat";
import { IChatUseCase } from "../interface/useCase/chatUseCase";
export declare class ChatUseCase implements IChatUseCase {
    private readonly conversationRepository;
    private readonly messagesRepository;
    constructor(conversationRepository: IConversationRepository, messagesRepository: IMessagesRepository);
    addChat(req: Req, next: Next): Promise<IMessageResposnse | void>;
    getChat(req: Req, next: NextFunction): Promise<void | IMessageResposnse>;
    getOnlineUsers(req: Req, next: NextFunction): Promise<void | IOnlineUsersResponse>;
}
