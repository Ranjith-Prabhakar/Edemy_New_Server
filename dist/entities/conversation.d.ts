import { TDocumentId } from "../frameworks/types/dbTypes";
export interface IConversation {
    courseId: TDocumentId;
    participants: string[];
    messages: TDocumentId[];
}
