import express from 'express';
import { getUserProfile, getUserEnrollments } from '../controllers/userController.js';
import { protect } from '../middleware/protect.js';

const router = express.Router(); 

router.get('/profile', protect, getUserProfile);
router.get('/my-enrollments', protect, getUserEnrollments);


export default router; 