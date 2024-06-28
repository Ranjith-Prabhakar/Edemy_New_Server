import { IConversation } from "../../../entities/conversation";
import { IConversationRepository } from "../../../useCasese/interface/repository/conversation";
import { IMessageResposnse, IOnlineUsersResponse, TOnlinerUsersIdForLogout } from "../../../useCasese/interface/request_And_Response/chat";
export declare class ConversationRepository implements IConversationRepository {
    addMessage(courseId: string, senderId: string, messageId: string): Promise<void | IMessageResposnse>;
    addParticipants(courseId: string, participantId: string): Promise<void | IConversation>;
    authorisedUser(userId: string): Promise<boolean | void>;
    getUsersList(courseId: string): Promise<IOnlineUsersResponse | void>;
    getUsersFromAllConversationForLoginAndLogout(userId: string): Promise<void | TOnlinerUsersIdForLogout>;
}
