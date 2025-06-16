import { MongoClient } from "mongodb";
console.log("Environment variables loaded:", process.env.ATLAS_URI ? "Yes" : "No");
const connectionString = process.env.ATLAS_URI || "mongodb+srv://admin:EVROddexP2QhJsy4@cluster0.exaefvh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
console.log("Connection string exists:", !!connectionString);
console.log("Connection string length:", connectionString.length);
console.log("First few characters of connection string:", connectionString.substring(0, 20) + "...");

const client = new MongoClient(connectionString);
let db;

export async function connectToDB() {
  if (!db) {
    try {
      console.log("Attempting to connect to MongoDB...");
      console.log("Using database name: myFirstDatabase");
      const conn = await client.connect();
      db = conn.db("myFirstDatabase");
      console.log("✅ Connected to MongoDB successfully");
      // Test the connection by listing collections
      const collections = await db.listCollections().toArray();
      console.log("Available collections:", collections.map(c => c.name));
    } catch (e) {
      console.error("❌ MongoDB connection failed. Full error:", e);
      throw e;
    }
  }
  return db;
}