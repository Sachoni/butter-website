// api/messages.js
import clientPromise from "./db.js";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("butter"); // database name
    const col = db.collection("messages");

    if (req.method === "POST") {
        try {
            const { text } = req.body;
            if (!text || typeof text !== "string") {
                return res.status(400).json({ error: "Invalid message text" });
            }
            const doc = { text, createdAt: new Date() };
            const result = await col.insertOne(doc);
            return res.status(201).json({ _id: result.insertedId, ...doc });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Insert failed" });
        }
    }

    if (req.method === "GET") {
        try {
            const docs = await col.find({}).sort({ createdAt: -1 }).limit(100).toArray();
            return res.status(200).json(docs);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Query failed" });
        }
    }

    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}