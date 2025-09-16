// api/db.js
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
    // helpful error if env var missing in deployment
    throw new Error("Please set the MONGODB_URI environment variable.");
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (globalThis._mongoClientPromise) {
    clientPromise = globalThis._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
    globalThis._mongoClientPromise = clientPromise;
}

export default clientPromise;