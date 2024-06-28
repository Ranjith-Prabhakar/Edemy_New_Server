import { IMessage } from "../../../entities/messages";
import { IMessagesRepository } from "../../../useCasese/interface/repository/messages";
export declare class MessagesRepository implements IMessagesRepository {
    addMessages(courseId: string, senderId: string, message: string): Promise<void | IMessage>;
    getMessages(courseId: string): Promise<void | IMessage[]>;
}
