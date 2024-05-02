import { IConversation } from "../../../entities/conversation";
import {
  IMessageResposnse,
  IOnlineUsersResponse,
  TOnlinerUsersIdForLogout,
} from "../request_And_Response/chat";

export interface IConversationRepository {
  addParticipants(
    courseId: string,
    participantId: string
  ): Promise<IConversation | void>;
  addMessage(
    courseId: string,
    senderId: string,
    messageId: string
  ): Promise<IMessageResposnse | void>;
  authorisedUser(userId: string): Promise<boolean | void>;
  getUsersList(courseId: string): Promise<IOnlineUsersResponse | void>;
  getUsersFromAllConversationForLoginAndLogout(
    userId: string
  ): Promise<TOnlinerUsersIdForLogout | void>;
}
