import { IMessage } from "../../../entities/messages";
import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IConversationRepository } from "../../interface/repository/conversation";
import { IMessagesRepository } from "../../interface/repository/messages";
import { catchError } from "../../middlewares/catchError";

export const addChat = async (
  messagesRepository: IMessagesRepository,
  conversationRepository: IConversationRepository,
  req: Req,
  next: Next
): Promise<IMessage | void> => {
  try {
    const messageRepoResult = await messagesRepository.addMessages(
      req.body.courseId as string,
      req.user?._id as string,
      req.body.message as string
    );
    if (messageRepoResult) {
      console.log(
        "inside add chat usecase engine messageRepoResult",
        messageRepoResult
      );
      const conversationRepoResult = await conversationRepository.addMessage(
        req.body.courseId as string,
        req.user?._id as string,
        messageRepoResult._id as string
      );
      return messageRepoResult;
    }
  } catch (error) {
    catchError(error, next);
  }
};
