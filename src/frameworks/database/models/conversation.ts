import mongoose, { Schema, Model } from "mongoose";
import { IConversation } from "../../../entities/conversation";

const conversationSchema: Schema<IConversation> = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "please enter a valid courseId"],
    },
    participants: [
      {
        type: [String],
        ref: "User",
        required: [true, "please enter a valid userId"],
      },
    ],
    messages: [
      {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Message",
        required: [true, "please enter a valid messageId"],
      },
    ],
  },
  { timestamps: true }
);

export const conversationModel: Model<IConversation> = mongoose.model(
  "conversation",
  conversationSchema
);
