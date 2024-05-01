import mongoose, { Schema, Model } from "mongoose";
import { IMessage } from "../../../entities/messages";

const messagesSchema: Schema<IMessage> = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "please enter a valid courseId"],
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "please enter a valid senderId"],
    },
    message: {
      type: String,
      required: [true, "please enter a valid courseId"],
    },
  },
  { timestamps: true }
);

export const messagesModel: Model<IMessage> = mongoose.model(
  "message",
  messagesSchema
);
