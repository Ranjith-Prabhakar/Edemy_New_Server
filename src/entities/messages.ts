import { TDocumentId } from "../frameworks/types/dbTypes";

export interface IMessage {
  courseId:TDocumentId
  senderId: TDocumentId;
  message: string;
}
