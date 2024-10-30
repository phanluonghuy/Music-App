import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";

// Importing routes
import authRoutes from "./routes/authRoutes.js";
import songRoutes from "./routes/songRoutes.js";
import playlistRoutes from "./routes/playlistRoutes.js";
import { getSongs, streamSong } from "./controllers/songController.js";
import { userJwtMiddleware } from "./middlewares/authMiddleware.js";

import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://redis:6379'
});

redisClient.connect()
  .then(() => console.log('Connected to Redis'))
  .catch(err => console.error('Redis connection error:', err));


// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Serve static files from the 'public' directory
app.use(express.static(path.join(path.resolve(), 'public')));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/song", userJwtMiddleware, songRoutes);
app.use("/api/v1/playlist", userJwtMiddleware, playlistRoutes);
app.get("/api/v1/stream/:filename", streamSong);


// app.get('/api/v1/songs', getSongs);
app.get('/api/v1/songs', async (req, res) => {
  try {
    const cachedSongs = await redisClient.get('songs');
    
    if (cachedSongs) {
      return res.json(JSON.parse(cachedSongs));
    }

    const songs = await getSongs();
    await redisClient.set('songs', JSON.stringify(songs), { EX: 3600 }); // Cache for 1 hour

    res.json(songs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving songs" });
  }
});


// Fallback to index.html for SPA
app.get("*", (req, res) => {
  res.send("Hello from Express!  " + process.env.MONGO_URI);
});

// Start the server
app.listen(1337, () => {
  console.log(`Server is running at localhost:1337`);
});
