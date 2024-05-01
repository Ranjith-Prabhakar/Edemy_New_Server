import { IMessage } from "../../../entities/messages";

export interface IMessagesRepository {
  addMessages(
    courseId: string,
    senderId: string,
    message: string
  ): Promise<IMessage | void>;

  getMessages(courseId: string): Promise<IMessage[] | void>;
}
