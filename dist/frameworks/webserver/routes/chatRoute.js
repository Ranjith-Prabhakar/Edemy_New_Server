"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRoute = void 0;
const injuctions_1 = require("./injections/injuctions");
const auth_1 = require("../middlewares/auth");
const catchAsyncErrors_1 = require("../middlewares/catchAsyncErrors");
function chatRoute(router) {
    router.post("/add_message", auth_1.isAuthenticated, (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.chatController.addChat(req, res, next);
    }));
    router.post("/get_message", auth_1.isAuthenticated, (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.chatController.getChat(req, res, next);
    }));
    router.post("/get_online_users", auth_1.isAuthenticated, (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.chatController.getOnlineUsers(req, res, next);
    }));
    return router;
}
exports.chatRoute = chatRoute;
//# sourceMappingURL=chatRoute.js.map