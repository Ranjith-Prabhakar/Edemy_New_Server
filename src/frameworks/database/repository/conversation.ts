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
      console.log("SenderId:", senderId);
      console.log("SenderId Type:", typeof senderId);

      const result = await conversationModel.findOneAndUpdate(
        { courseId: courseId, participants: { $in: [senderId] } },
        { $push: { messages: messageId } },
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
        { $push: { participants: participantId } },
        { upsert: true, returnOriginal: false, timestamps: true }
      );
      if (result) return result;
    } catch (error) {
      throw error;
    }
  }

  async authorisedUser(userId: string): Promise<boolean | void> {
    try {
      const result = await conversationModel.findOne({
        participants: { $in: [userId] },
      });
      if (result) return true;
      else return false;
    } catch (error) {
      throw error;
    }
  }
}
