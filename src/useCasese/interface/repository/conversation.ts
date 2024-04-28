import { IConversation } from "../../../entities/conversation";

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
}
