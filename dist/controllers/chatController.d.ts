import { Next, Req, Res } from "../frameworks/types/serverPackageTypes";
import { IChatUseCase } from "../useCasese/interface/useCase/chatUseCase";
export declare class ChatController {
    private readonly chatUseCase;
    constructor(chatUseCase: IChatUseCase);
    addChat(req: Req, res: Res, next: Next): Promise<void>;
    getChat(req: Req, res: Res, next: Next): Promise<void>;
    getOnlineUsers(req: Req, res: Res, next: Next): Promise<void>;
}
