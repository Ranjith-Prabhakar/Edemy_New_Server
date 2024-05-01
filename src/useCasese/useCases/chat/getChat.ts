import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IConversationRepository } from "../../interface/repository/conversation";
import { IMessagesRepository } from "../../interface/repository/messages";
import { IMessageResposnse } from "../../interface/request_And_Response/chat";
import { catchError } from "../../middlewares/catchError";

export const getChat = async (
  messagesRepository: IMessagesRepository,
  conversationRepository: IConversationRepository,
  req: Req,
  next: Next
): Promise<void | IMessageResposnse> => {
  try {
    const authorisedUser = await conversationRepository.authorisedUser(
      req.user?._id as string
    );
    if (authorisedUser) {
      const messages = await messagesRepository.getMessages(
        req.body.courseId as string
      );
      if (messages) {
        return {
          success: true,
          message: "messeges found",
          data: { messages },
        };
      } else {
        return {
          success: false,
          message: "messeges not found",
        };
      }
    } else {
      return {
        success: true,
        message: "user not found",
      };
    }
  } catch (error) {
    catchError(error, next);
  }
};
