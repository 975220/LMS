import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyCourses } from "../assets/assets"; // Make sure dummyCourses uses courseChapters
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true); // For toggling educator UI
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Load dummy courses (simulating API fetch)
  const fetchAllCourses = () => {
    setAllCourses(dummyCourses);
  };

  // Calculate average rating of a course
  const calculateRating = (course) => {
    if (!course?.courseRating || course.courseRating.length === 0) return 0;
    const total = course.courseRating.reduce((sum, r) => sum + r.rating, 0);
    return parseFloat((total / course.courseRating.length).toFixed(1));
  };

  // Calculate total number of lectures in a course
  const calculateTotalLectures = (course) => {
    let total = 0;
    course.courseChapters?.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        total += chapter.chapterContent.length;
      }
    });
    return total;
  };

  // Calculate total duration of a course (all chapters/lectures)
  const calculateCourseDuration = (course) => {
    let minutes = 0;
    course.courseChapters?.forEach((chapter) => {
      chapter.chapterContent?.forEach((lecture) => {
        minutes += lecture.lectureDuration || 0;
      });
    });
    return humanizeDuration(minutes * 60 * 1000, { units: ["h", "m"], round: true });
  };

  // Calculate time of a single chapter
  const calculateChapterTime = (chapter) => {
    let minutes = 0;
    chapter.chapterContent?.forEach((lecture) => {
      minutes += lecture.lectureDuration || 0;
    });
    return humanizeDuration(minutes * 60 * 1000, { units: ["h", "m"], round: true });
  };

  // Fetch user enrollments (dummy data for now)
  const fetchUserEnrolledCourses = async () => {
    // Simulate fetching enrolled courses
    setEnrolledCourses(dummyCourses);
  };



  useEffect(() => {
    fetchAllCourses();
    fetchUserEnrolledCourses();
  }, []);
  

  const value = {
    currency,
    navigate,
    allCourses,
    setAllCourses,
    isEducator,
    setIsEducator,
    calculateRating,
    calculateTotalLectures,
    calculateCourseDuration,
    calculateChapterTime,
    enrolledCourses,
    fetchUserEnrolledCourses,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
