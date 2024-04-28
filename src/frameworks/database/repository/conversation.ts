import { IConversation } from "../../../entities/conversation";
import { IConversationRepository } from "../../../useCasese/interface/repository/conversation";
import { conversationModel } from "../models/conversation";

export class ConversationRepository implements IConversationRepository {
  async addMessage(
    courseId: string,
    senderId: string,
    messageId: string
  ): Promise<void | IConversation> {
    try {
      const result = await conversationModel.findOneAndUpdate(
        { courseId: courseId, participants: { $in: [senderId] } },
        { messages: { $push: messageId } },
        { returnOriginal: false, timestamps: true }
      );
      if (result) return result;
    } catch (error) {
      throw error;
    }
  }
  async addParticipants(
    courseId: string,
    participantId: string
  ): Promise<void | IConversation> {
    try {
      const result = await conversationModel.findOneAndUpdate(
        { courseId },
        { $push: { participants: participantId } }, // Correctly use $push operator
        { upsert: true, returnOriginal: false, timestamps: true }
      );
      if (result) return result;
    } catch (error) {
      throw error;
    }
  }
}
