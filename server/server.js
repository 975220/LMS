import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // ⬅️ This was missing in your imports
import ConnectDB from "./configs/mongodb.js";
import { clerkWebboks } from "./controllers/webhooks.js";

// Load environment variables
dotenv.config(); // ⬅️ only use one method to load .env

// Initialize Express 
const app = express();

// Connect to database 
await ConnectDB() 

// Middleware 
app.use(cors());
app.use(express.json()); // ⬅️ Good practice to handle JSON payloads

// Routes 
app.get('/', (req, res) => res.send("API Working"));
app.post('/clerk', express.json(), clerkWebboks)

// Port 
const PORT = process.env.PORT || 5000; // ⬅️ Fix casing: should be process.env.PORT (not "Port")

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
