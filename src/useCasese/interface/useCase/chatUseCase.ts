import { IMessage } from "../../../entities/messages";
import { Next, Req } from "../../../frameworks/types/serverPackageTypes";

export interface IChatUseCase {
  addChat(req: Req, next: Next): Promise<IMessage | void>;
}