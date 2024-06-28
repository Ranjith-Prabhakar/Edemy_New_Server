"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Io = exports.httpServer = void 0;
const socket_io_1 = require("socket.io");
const app_1 = require("./app");
const http_1 = require("http");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const StaticClassProperty_1 = require("../../../useCasese/staticClassProperty/StaticClassProperty");
const httpServer = (0, http_1.createServer)(app_1.app);
exports.httpServer = httpServer;
const Io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: process.env.CLIENT,
    },
});
exports.Io = Io;
Io.on("connect", (client) => {
    if (client.handshake.query.userId) {
        StaticClassProperty_1.SocketClass.SocketUsers[client.handshake.query.userId] = client;
    }
    client.on("disconnect", () => {
        console.log("the client ", client.id, " has been disconected");
        console.log("client.handshake.query.userId", client.handshake.query.userId);
        console.log("users", Object.keys(StaticClassProperty_1.SocketClass.SocketUsers));
        delete StaticClassProperty_1.SocketClass.SocketUsers[client.handshake.query.userId];
        console.log("users after", Object.keys(StaticClassProperty_1.SocketClass.SocketUsers));
    });
});
//# sourceMappingURL=socket.js.map