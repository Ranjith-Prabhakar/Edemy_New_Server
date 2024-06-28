import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IConversationRepository } from "../../interface/repository/conversation";
import { IMessagesRepository } from "../../interface/repository/messages";
import { IMessageResposnse } from "../../interface/request_And_Response/chat";
export declare const getChat: (messagesRepository: IMessagesRepository, conversationRepository: IConversationRepository, req: Req, next: Next) => Promise<void | IMessageResposnse>;
