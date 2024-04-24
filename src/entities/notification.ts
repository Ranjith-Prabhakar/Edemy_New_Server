import { ICourse } from "./course";

export enum ENotification {
  "instructorRequests" = "instructorRequests",
  "instructorRequestApproval" = "instructorRequestApproval",
  "instructorRequestRejection" = "instructorRequestRejection",
  "courseApprovalRequest" = "courseApprovalRequest",
  "courseApprovalApprovance" = "courseApprovalApprovance",
  "broadCasting" = "broadCasting",
}

export enum ENotificationMsg {
  "instructorRequests" = "A Request from a user to be instructor has been registered",
  "instructorRequestApproval" = "Request for being instructor has been approved",
  "instructorRequestRejection" = "Request for being instructor has been rejected",
  "courseApprovalRequest" = "A Request from a instructor for new course approval has been recorded",
  "courseApprovalApprovance" = "Request for new course has been approved",
  "courseApprovalApprovanceForAllUsers" = "A new course has been added",
}

export interface INotification {
  _id: string;
  userId: string;
  instructorRequests?: boolean;
  instructorRequestRejection?: boolean;
  instructorRequestApproval?: boolean;
  courseApprovalRequest?: boolean;
  courseApprovalApprovance?: boolean;
  broadCasting?: ICourse[];
}
