import { NextFunction } from "express";
import { Next, Req } from "../../frameworks/types/serverPackageTypes";
import { IConversationRepository } from "../interface/repository/conversation";
import { IMessagesRepository } from "../interface/repository/messages";
import {
  IMessageResposnse,
  IOnlineUsersResponse,
} from "../interface/request_And_Response/chat";
import { IChatUseCase } from "../interface/useCase/chatUseCase";
import { catchError } from "../middlewares/catchError";
import * as chatRepositoryEngine from "./chat/index";
export class ChatUseCase implements IChatUseCase {
  private readonly conversationRepository: IConversationRepository;
  private readonly messagesRepository: IMessagesRepository;
  constructor(
    conversationRepository: IConversationRepository,
    messagesRepository: IMessagesRepository
  ) {
    this.conversationRepository = conversationRepository;
    this.messagesRepository = messagesRepository;
  }
  async addChat(req: Req, next: Next): Promise<IMessageResposnse | void> {
    try {
      return await chatRepositoryEngine.addChat(
        this.messagesRepository,
        this.conversationRepository,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // ---------------------
  async getChat(
    req: Req,
    next: NextFunction
  ): Promise<void | IMessageResposnse> {
    try {
      return await chatRepositoryEngine.getChat(
        this.messagesRepository,
        this.conversationRepository,
        req,
        next
      );
    } catch (error) {
      catchError(error, next);
    }
  }
  // --------------------
  async getOnlineUsers(
    req: Req,
    next: NextFunction
  ): Promise<void | IOnlineUsersResponse> {
    try {
      return await chatRepositoryEngine.getOnlineUsers(this.conversationRepository,req,next);
    } catch (error) {
      catchError(error, next);
    }
  }
}
