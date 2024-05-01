import { IConversation } from "../../../entities/conversation";
import { IConversationRepository } from "../../../useCasese/interface/repository/conversation";
import {
  IMessageResposnse,
  IOnlineUsersResponse,
  TOnlineUsers,
} from "../../../useCasese/interface/request_And_Response/chat";
import { conversationModel } from "../models/conversation";
import userModel from "../models/userModel";

export class ConversationRepository implements IConversationRepository {
  async addMessage(
    courseId: string,
    senderId: string,
    messageId: string
  ): Promise<void | IMessageResposnse> {
    try {
      const result = await conversationModel.findOneAndUpdate(
        { courseId: courseId, participants: { $in: [senderId] } },
        { $push: { messages: messageId } },
        { returnOriginal: false, timestamps: true }
      );
      if (result) {
        const usersList = await conversationModel.find(
          {},
          { participants: true, _id: 0 }
        );
        if (usersList) {
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
  // --------------------------------------

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
  // --------------------------------------
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
  // --------------------------------------
  async getUsersList(courseId: string): Promise<IOnlineUsersResponse | void> {
    try {
      const conversations = await conversationModel.find(
        { courseId },
        { participants: 1, _id: 0 }
      );

      const users = await userModel.find(
        { _id: { $in: conversations[0].participants } },
        "_id name"
      );
      if (users) {
        return {
          success: true,
          message: "online users have been fetched",
          data: users as unknown as TOnlineUsers,
        };
      }
    } catch (error) {
      throw error;
    }
  }
}
