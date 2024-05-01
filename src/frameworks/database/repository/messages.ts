import { IMessage } from "../../../entities/messages";
import { IMessagesRepository } from "../../../useCasese/interface/repository/messages";
import { messagesModel } from "../models/messages";

export class MessagesRepository implements IMessagesRepository {
  async addMessages(
    courseId: string,
    senderId: string,
    message: string
  ): Promise<void | IMessage> {
    try {
      const result = await messagesModel.create({
        courseId,
        senderId,
        message,
      });
      const populatedMessage = await messagesModel
        .findById(result._id)
        .populate({
          path: "senderId",
          model: "user",
          select: "name",
        })
        .exec();
      return populatedMessage as IMessage;
    } catch (error) {
      throw error;
    }
  }

  async getMessages(courseId: string): Promise<void | IMessage[]> {
    try {
      const result = await messagesModel
        .find({ courseId })
        .populate({
          path: "senderId",
          model: "user",
          select: "name",
        })
        .exec();
      return result;
    } catch (error) {
      throw error;
    }
  }
}
