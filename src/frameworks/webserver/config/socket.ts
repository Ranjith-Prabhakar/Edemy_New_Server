import { Server } from "socket.io";
import { app } from "./app";
import { createServer } from "http";
import dotenv from "dotenv";
dotenv.config();
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../types/socketTypes";
import { SocketClass } from "../../../useCasese/staticClassProperty/StaticClassProperty";

const httpServer = createServer(app);

const Io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: process.env.CLIENT,
  },
});

Io.on("connect", (client) => {
  if (client.handshake.query.userId) {
    SocketClass.SocketUsers[client.handshake.query.userId as string] = client;
  }

  client.on("disconnect", () => {
    console.log("the client ", client.id, " has been disconected");
    console.log("client.handshake.query.userId", client.handshake.query.userId);
    console.log("users", Object.keys(SocketClass.SocketUsers));
    delete SocketClass.SocketUsers[client.handshake.query.userId as string];
     console.log("users after", Object.keys(SocketClass.SocketUsers));
     
  });
});

export { httpServer, Io };
