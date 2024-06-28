import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IConversationRepository } from "../../interface/repository/conversation";
import { IOnlineUsersResponse } from "../../interface/request_And_Response/chat";
export declare const getOnlineUsers: (conversationRepository: IConversationRepository, req: Req, next: Next) => Promise<void | IOnlineUsersResponse>;
