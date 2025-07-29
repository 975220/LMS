import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyCourses } from "../assets/assets";
import humanizeDuration from "humanize-duration";
import { useAuth, useUser } from "@clerk/clerk-react"; // ✅ Clerk Hooks
import API from '../utils/api'; // ✅ Add this import


export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true); // Change based on user role later
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // ✅ Clerk Hooks
  const { getToken } = useAuth();
  const { user } = useUser();

  // 🔐 Save Clerk token to localStorage for backend use
  useEffect(() => {
    const storeToken = async () => {
      try {
        const token = await getToken();
        if (token) {
          localStorage.setItem("token", token);
        }
      } catch (error) {
        console.error("Failed to get Clerk token:", error.message);
      }
    };

    if (user) {
      storeToken();
    }
  }, [user]);

  // 🔄 Load dummy courses
  const fetchAllCourses = () => {
    setAllCourses(dummyCourses);
  };

  // 📚 Fetch enrolled courses (simulate now, connect to backend later

const fetchUserEnrolledCourses = async () => {
  try {
    const { data } = await API.get('/users/my-enrollments');
    setEnrolledCourses(data);
  } catch (error) {
    console.error('Error fetching enrolled courses', error);
  }
};


  // ⭐ Calculate average course rating
  const calculateRating = (course) => {
    if (!course?.courseRating || course.courseRating.length === 0) return 0;
    const total = course.courseRating.reduce((sum, r) => sum + r.rating, 0);
    return parseFloat((total / course.courseRating.length).toFixed(1));
  };

  // 🔢 Total lectures in a course
  const calculateTotalLectures = (course) => {
    let total = 0;
    course.courseChapters?.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        total += chapter.chapterContent.length;
      }
    });
    return total;
  };

  // ⏱ Total course duration
  const calculateCourseDuration = (course) => {
    let minutes = 0;
    course.courseChapters?.forEach((chapter) => {
      chapter.chapterContent?.forEach((lecture) => {
        minutes += lecture.lectureDuration || 0;
      });
    });
    return humanizeDuration(minutes * 60 * 1000, { units: ["h", "m"], round: true });
  };

  // ⏱ Duration of one chapter
  const calculateChapterTime = (chapter) => {
    let minutes = 0;
    chapter.chapterContent?.forEach((lecture) => {
      minutes += lecture.lectureDuration || 0;
    });
    return humanizeDuration(minutes * 60 * 1000, { units: ["h", "m"], round: true });
  };

  // 🚀 Load on first render
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
