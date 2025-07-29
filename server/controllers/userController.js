import User from '../models/User.js';
import Course from '../models/Course.js'; // You must have a Course model

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getUserEnrollments = async (req, res) => {
  try {
    // Assuming User model has an array of course IDs
    const user = await User.findById(req.user._id);
    const enrolledCourses = await Course.find({ _id: { $in: user.enrolledCourses } });
    res.json(enrolledCourses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch enrollments' });
  }
};
