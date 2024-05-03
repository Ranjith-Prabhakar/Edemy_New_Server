// import { IMessage } from "../../../entities/messages";

// export interface IMessageResposnse {
//   success: boolean;
//   message: string;
//   data?: {
//     message?: IMessage;
//     messages?: IMessage[];
//   };
//   participants?: string[];
// }

// export type TOnlineUsers = [
//   {
//     _id: string;
//     name: string;
//   }
// ];
// export interface IOnlineUsersResponse {
//   success: boolean;
//   message: string;
//   data?: TOnlineUsers;
// }

// export type TOnlinerUsersIdForLogout = string[]

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

export type TOnlineUsers = [
  {
    _id: string;
    name: string;
  }
];
export interface IOnlineUsersResponse {
  success: boolean;
  message: string;
  data?: { onlineUsers?: TOnlineUsers; allUsers?: TOnlineUsers };
}

export type TOnlinerUsersIdForLogout = string[];
