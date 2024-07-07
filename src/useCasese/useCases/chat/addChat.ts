import { IMessage } from "../../../entities/messages";
import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IConversationRepository } from "../../interface/repository/conversation";
import { IMessagesRepository } from "../../interface/repository/messages";
import { IMessageResposnse } from "../../interface/request_And_Response/chat";
import { catchError } from "../../middlewares/catchError";
import { SocketClass } from "../../staticClassProperty/StaticClassProperty";

export const addChat = async (
  messagesRepository: IMessagesRepository,
  conversationRepository: IConversationRepository,
  req: Req,
  next: Next
): Promise<IMessageResposnse | void> => {
  try {
    const authenticatedUser = await conversationRepository.authorisedUser(
      req.user?._id as string
    );
    if (authenticatedUser) {
      const messageRepoResult = await messagesRepository.addMessages(
        req.body.courseId as string,
        req.user?._id as string,
        req.body.message as string
      );
      if (messageRepoResult) {
       
        const conversationRepoResult = await conversationRepository.addMessage(
          req.body.courseId as string,
          req.user?._id as string,
          messageRepoResult._id as string
        );
       
        const newConversationRepoResult =
          conversationRepoResult as IMessageResposnse;

        newConversationRepoResult.participants?.map((item) => {
          SocketClass.SocketUsers[item[0]]?.emit(
            "fromServerCommunityChatNewChatMessage",
            messageRepoResult
          );
        });

        //
        return {
          success: true,
          message: "message has been added",
          data: { message: messageRepoResult },
        };
      }
    } else {
      return { success: false, message: "un-authorised user" };
    }
  } catch (error) {
    catchError(error, next);
  }
};
