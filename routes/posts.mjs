import express from 'express';
import { connectToDB } from '../db/conn.mjs'; // adjust the path if needed
import { ObjectId } from 'mongodb';


const router = express.Router();


// Get a list of 50 posts
router.get("/", async (req, res) => {
  try {
    console.log("Attempting to connect to database...");
    const db = await connectToDB();
    console.log("Database connected, getting posts collection...");
    const collection = db.collection("posts");
    console.log("Finding posts...");
    const results = await collection.find({})
      .limit(50)
      .toArray();
    console.log("Posts found:", results.length);
    res.status(200).send(results);
  } catch (error) {
    console.error("Detailed error in GET /posts:", error);
    res.status(500).send({ error: "Failed to fetch posts", details: error.message });
  }
});

// Fetches the latest posts
router.get("/latest", async (req, res) => {
  try {
    const db = await connectToDB();
    const collection = db.collection("posts");
    const results = await collection.aggregate([
      {"$project": {"author": 1, "title": 1, "tags": 1, "date": 1}},
      {"$sort": {"date": -1}},
      {"$limit": 3}
    ]).toArray();
    res.status(200).send(results);
  } catch (error) {
    console.error("Error fetching latest posts:", error);
    res.status(500).send({ error: "Failed to fetch latest posts" });
  }
});

// Get a single post
router.get("/:id", async (req, res) => {
  try {
    const db = await connectToDB();
    const collection = db.collection("posts");
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);
    if (!result) {
      res.status(404).send({ error: "Post not found" });
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).send({ error: "Failed to fetch post" });
  }
});

// Add a new document to the collection
router.post("/", async (req, res) => {
  const db = await connectToDB();
  const collection = db.collection("posts");
  const newDocument = req.body;
  newDocument.date = new Date();
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// Update the post with a new comment
router.patch("/comment/:id", async (req, res) => {
  const db = await connectToDB();
  const collection = db.collection("posts");
  const query = { _id: new ObjectId(req.params.id) };
  const updates = {
    $push: { comments: req.body }
  };
  const result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

// Delete an entry
router.delete("/:id", async (req, res) => {
  const db = await connectToDB();
  const collection = db.collection("posts");
  const query = { _id: new ObjectId(req.params.id) };
  const result = await collection.deleteOne(query);
  
  res.send(result).status(200);
});


export default router;