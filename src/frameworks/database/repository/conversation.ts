import { IConversation } from "../../../entities/conversation";
import { IConversationRepository } from "../../../useCasese/interface/repository/conversation";
import { IMessageResposnse } from "../../../useCasese/interface/request_And_Response/chat";
import { conversationModel } from "../models/conversation";

export class ConversationRepository implements IConversationRepository {
  async addMessage(
    courseId: string,
    senderId: string,
    messageId: string
  ): Promise<void | IMessageResposnse> {
    try {
      console.log("SenderId:", senderId);
      console.log("SenderId Type:", typeof senderId);

      const result = await conversationModel.findOneAndUpdate(
        { courseId: courseId, participants: { $in: [senderId] } },
        { $push: { messages: messageId } },
        { returnOriginal: false, timestamps: true }
      );
      if (result) {
        const usersList = await conversationModel
          .find({}, { participants: true, _id: 0 })
        if (usersList) {
          console.log("usersList 22222222222", [...usersList[0].participants]);
          const newUserList = usersList[0].participants;
          return {
            success: true,
            message: "message has been updated",
            participants: newUserList,
          };
        }
      }
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
