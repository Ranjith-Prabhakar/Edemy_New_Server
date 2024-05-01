import { Next, Req, Res } from "../frameworks/types/serverPackageTypes";
import { IChatUseCase } from "../useCasese/interface/useCase/chatUseCase";
import { catchError } from "../useCasese/middlewares/catchError";

export class ChatController {
  private readonly chatUseCase: IChatUseCase;

  constructor(chatUseCase: IChatUseCase) {
    this.chatUseCase = chatUseCase;
  }
  // ----------------------------------
  async addChat(req: Req, res: Res, next: Next) {
    try {
      const result = await this.chatUseCase.addChat(req, next);
      res.status(200).json({ result });
    } catch (error) {
      catchError(error, next);
    }
  }
  // ----------------------------
  async getChat(req: Req, res: Res, next: Next) {
    try {
      const result = await this.chatUseCase.getChat(req, next);
      res.status(200).json({ result });
    } catch (error) {
      catchError(error, next);
    }
  }
  // ----------------------------
  async getOnlineUsers(req: Req, res: Res, next: Next) {
    try {
      const result = await this.chatUseCase.getOnlineUsers(req, next);
      res.status(200).json({ result });
    } catch (error) {
      catchError(error, next);
    }
  }
  ;
}
