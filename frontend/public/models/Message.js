// api/models/Message.js
import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({ text: String }, { timestamps: true });

export default mongoose.models.Message || mongoose.model("Message", MessageSchema);