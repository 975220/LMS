import mongoose from 'mongoose';

const lectureSchema = new mongoose.Schema({
  lectureTitle: String,
  lectureVideoUrl: String,
  lectureDuration: Number,
});

const chapterSchema = new mongoose.Schema({
  chapterTitle: String,
  chapterContent: [lectureSchema],
});

const courseSchema = new mongoose.Schema({
  courseTitle: String,
  courseDescription: String,
  coursePrice: Number,
  courseThumbnail: String,
  courseRating: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rating: Number,
    },
  ],
  courseChapters: [chapterSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Course', courseSchema);
