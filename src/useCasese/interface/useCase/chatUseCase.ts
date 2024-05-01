import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IMessageResposnse, IOnlineUsersResponse } from "../request_And_Response/chat";

export interface IChatUseCase {
  addChat(req: Req, next: Next): Promise<IMessageResposnse | void>;
  getChat(req: Req, next: Next): Promise<IMessageResposnse | void>;
  getOnlineUsers(req: Req, next: Next): Promise<IOnlineUsersResponse | void>;
}