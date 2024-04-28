import { TDocumentId } from "../frameworks/types/dbTypes";

export interface IMessages {
  courseId:TDocumentId
  senderId: TDocumentId;
  message: string;
}
