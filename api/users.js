import connectDB from "./db.js";
import mongoose from "mongoose";

// Define a simple User schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
});

// Prevent recompiling model if already compiled
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default async function handler(req, res) {
    await connectDB();

    if (req.method === "GET") {
        try {
            const users = await User.find({});
            return res.status(200).json(users);
        } catch (err) {
            return res.status(500).json({ error: "Failed to fetch users" });
        }
    }

    if (req.method === "POST") {
        try {
            const { name, email } = req.body;
            const newUser = await User.create({ name, email });
            return res.status(201).json(newUser);
        } catch (err) {
            return res.status(500).json({ error: "Failed to create user" });
        }
    }

    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}