// server/routes/authRoutes.js

import express from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/test', (req, res) => res.json({ message: '✅ Auth route working' }));

export default router;
