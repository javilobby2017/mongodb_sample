// Load environment variables
import "./LoadEnviroment.mjs";

import express from 'express';
import cors from 'cors';
const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

import posts from './routes/posts.mjs';

// Load the /posts routes
app.use("/posts", posts);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});