import mongoose, { Schema, Model } from "mongoose";
import { IMessages } from "../../../entities/messages";

const messagesSchema: Schema<IMessages> = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "please enter a valid courseId"],
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "please enter a valid senderId"],
  },
  message: {
    type: String,
    required: [true, "please enter a valid courseId"],
  },
});

export const messagesModel:Model<IMessages> = mongoose.model("messages",messagesSchema)