import { TDocumentId } from "../frameworks/types/dbTypes";

export interface IMessage {
  _id: string;
  courseId: TDocumentId;
  senderId: TDocumentId;
  message: string;
}
