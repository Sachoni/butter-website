// api/messages.js
import { connectDB } from "./db.js";
import Message from "./models/Message.js";

export default async function handler(req, res) {
    await connectDB();

    if (req.method === "POST") {
        const { text } = req.body;
        const newMsg = await Message.create({ text });
        return res.status(201).json(newMsg);
    }

    if (req.method === "GET") {
        const msgs = await Message.find().sort({ createdAt: -1 });
        return res.status(200).json(msgs);
    }

    res.status(405).json({ error: "Method not allowed" });
}