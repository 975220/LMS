import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/student/Home';
import CourseList from './pages/student/CourseList';
import CourseDetails from './pages/student/CourseDetails';
import MyEnrollments from './pages/student/MyEnrollments';
import Players from './pages/student/Players';
import Loading from './components/students/Loading';
import Educator from './pages/educator/Educator';
import Dashboard from './pages/educator/Dashboard';
import AddCourse from './pages/educator/AddCourse';
import MyCourse from './pages/educator/MyCourse';
import StudentsEnrolled from './pages/educator/StudentsEnrolled';
import Navbar from './components/students/Navbar';
import "quill/dist/quill.snow.css";


const App = () => {
  const location = useLocation();
  const isEducatorRoute = location.pathname.startsWith('/educator');

  return (
    <div className='text-default min-h-screen bg-white'>
      {/* Show Navbar only if not on Educator route */}
      {!isEducatorRoute && <Navbar />}

      {/* 👇 Add padding to push content below fixed navbar */}
      <div style={{ paddingTop: isEducatorRoute ? 0 : '80px' }}>
        <Routes>
          {/* Student Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/course-list" element={<CourseList />} />
          <Route path="/course-list/:input" element={<CourseList />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/my-enrollments" element={<MyEnrollments />} />
          <Route path="/player/:courseId" element={<Players />} />
          <Route path="/loading/:path" element={<Loading />} />

          {/* Educator Routes */}
          <Route path="/educator" element={<Educator />}>
            <Route index element={<Dashboard />} />
            <Route path="add-course" element={<AddCourse />} />
            <Route path="my-course" element={<MyCourse />} />
            <Route path="student-enrolled" element={<StudentsEnrolled />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
