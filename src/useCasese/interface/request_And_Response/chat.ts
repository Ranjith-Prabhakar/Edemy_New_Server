import { IMessage } from "../../../entities/messages";

export interface IMessageResposnse {
  success: boolean;
  message: string;
  data?: {
    message?: IMessage;
    messages?: IMessage[];
  };
  participants?: string[];
}
