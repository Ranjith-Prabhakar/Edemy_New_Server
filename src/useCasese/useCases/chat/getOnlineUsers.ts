
import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IConversationRepository } from "../../interface/repository/conversation";
import {
  IOnlineUsersResponse,
  TOnlineUsers,
} from "../../interface/request_And_Response/chat";
import { catchError } from "../../middlewares/catchError";
import { SocketClass } from "../../staticClassProperty/StaticClassProperty";

export const getOnlineUsers = async (
  conversationRepository: IConversationRepository,
  req: Req,
  next: Next
): Promise<void | IOnlineUsersResponse> => {
  try {
    const usersList = await conversationRepository.getUsersList(
      req.body.courseId
    );

    const onlineUsers = (
      usersList as IOnlineUsersResponse
    ).data?.allUsers?.filter((user) => {
      if (SocketClass.SocketUsers[user._id]) {
        return user;
      }
    });

    return {
      success: true,
      message: "online users have been fetched",
      data: {
        onlineUsers: onlineUsers as TOnlineUsers,
        allUsers: usersList?.data?.allUsers as TOnlineUsers,
      },
    };
  } catch (error) {
    catchError(error, next);
  }
};
