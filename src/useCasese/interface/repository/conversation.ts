import { IConversation } from "../../../entities/conversation";
import { TDocumentId } from "../../../frameworks/types/dbTypes";

export interface IConversationRepository {
  addParticipants(
    courseId: string,
    participantId: string
  ): Promise<IConversation | void>;
  addMessage(
    courseId: string,
    senderId: string,
    messageId: string
  ): Promise<IConversation | void>;
  authorisedUser(userId: string): Promise<boolean | void>;
}
