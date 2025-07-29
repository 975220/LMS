// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Middlewares
app.use(cors({
  origin: 'http://localhost:5173',  // Frontend URL
  credentials: true,               // Allow cookies
}));

app.use(express.json());           // Parse JSON requests
app.use(cookieParser());           // Read cookies

// ✅ API Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);


// ❌ Catch-all for unknown API routes
app.all('*', (req, res) => {
  res.status(404).json({
    message: `❌ API route not found: [${req.method}] ${req.originalUrl}`,
  });
});

// ⚠️ Global error handler
app.use(errorHandler);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
