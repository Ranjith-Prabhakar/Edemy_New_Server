import { Server, Socket } from "socket.io";

import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { ICourse } from "../../entities/course";
import { IInstructorAgreement } from "../../entities/instructorAgreement";
import { IMessage } from "../../entities/messages";



export interface ServerToClientEvents {
  fromServerUserLogin: ({ _id, name }: { _id: string; name: string }) => void;
  fromServerUserLogout: (userId: string) => void;
  fromServerCourseAdded: (course: ICourse, message: string) => void;
  fromServerInstructorRequestSubmitted: (
    agreement: IInstructorAgreement
  ) => void;
  fromServerInstrctorRequestApproval: (message: string) => void;
  fromServerCourseApproved: (message: string) => void;
  fromServerCourseApprovedNotificationForAllUsers: (message: string) => void;
  fromServerCommunityChatNewChatMessage: (message: IMessage) => void;
}
export interface ClientToServerEvents {
  clientSideLogin: (message: string) => void;
}

//socket server
export type TSocket = Server<
  ServerToClientEvents,
  ClientToServerEvents,
  DefaultEventsMap,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
>;
//socket client
export type TSocketMap = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  DefaultEventsMap,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
>;
