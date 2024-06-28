"use strict";
// import { Next, Req } from "../../../frameworks/types/serverPackageTypes";
// import { IConversationRepository } from "../../interface/repository/conversation";
// import {
//   IOnlineUsersResponse,
//   TOnlineUsers,
// } from "../../interface/request_And_Response/chat";
// import { catchError } from "../../middlewares/catchError";
// import { SocketClass } from "../../staticClassProperty/StaticClassProperty";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOnlineUsers = void 0;
const catchError_1 = require("../../middlewares/catchError");
const StaticClassProperty_1 = require("../../staticClassProperty/StaticClassProperty");
const getOnlineUsers = async (conversationRepository, req, next) => {
    try {
        const usersList = await conversationRepository.getUsersList(req.body.courseId);
        const onlineUsers = usersList.data?.allUsers?.filter((user) => {
            if (StaticClassProperty_1.SocketClass.SocketUsers[user._id]) {
                return user;
            }
        });
        return {
            success: true,
            message: "online users have been fetched",
            data: {
                onlineUsers: onlineUsers,
                allUsers: usersList?.data?.allUsers,
            },
        };
    }
    catch (error) {
        (0, catchError_1.catchError)(error, next);
    }
};
exports.getOnlineUsers = getOnlineUsers;
//# sourceMappingURL=getOnlineUsers.js.map