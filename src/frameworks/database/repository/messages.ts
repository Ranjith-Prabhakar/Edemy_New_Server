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
      return result;
    } catch (error) {
      throw error;
    }
  }
}
