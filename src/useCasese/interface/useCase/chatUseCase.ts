import { IMessage } from "../../../entities/messages";
import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
import { IMessageResposnse } from "../request_And_Response/chat";

export interface IChatUseCase {
  addChat(req: Req, next: Next): Promise<IMessageResposnse | void>;
  getChat(req: Req, next: Next): Promise<IMessageResposnse | void>;
}