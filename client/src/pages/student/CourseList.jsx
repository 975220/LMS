import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import Searchbar from '../../components/students/Searchbar';
import { useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import Footer from '../../components/students/Footer';
import CourseCard from '../../components/students/Coursecard';

const CourseList = () => {
  const { navigate, allCourses } = useContext(AppContext);
  const { input } = useParams();
  const [filteredCourses, setfilteredCourses] = useState([]);

  useEffect(() => {
    if (!allCourses || allCourses.length === 0) return;

    const tempCourse = allCourses.slice();

    input
      ? setfilteredCourses(
          tempCourse.filter(item =>
            item.courseTitle.toLowerCase().includes(input.toLowerCase())
          )
        )
      : setfilteredCourses(tempCourse);
  }, [allCourses, input]);

  return (
    <>
      <style>{`
        .course-list-container {
          padding: 2rem 3rem;
        }

        .course-list-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .course-list-header p {
          color: #4b5563;
          font-size: 1.125rem;
          font-weight: 600;
        }

        .course-list-header span {
          cursor: pointer;
          color: #3b82f6;
        }

        .search-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .search-info img {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .no-courses {
          font-size: 1.1rem;
          color: #9ca3af;
          margin-top: 2rem;
        }
      `}</style>

      <div className="course-list-container">
        <div className="course-list-header">
          <h1>Course List</h1>
          <p>
            <span onClick={() => navigate('/')}>Home</span> / <span>Course List</span>
          </p>
        </div>

        <Searchbar data={input} />

        {input && (
          <div className="search-info">
            <p>{input}</p>
            <img
              src={assets.cross_icon}
              alt="Clear"
              onClick={() => navigate('/course-list')}
            />
          </div>
        )}

        <div className="courses-grid">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))
          ) : (
            <p className="no-courses">No courses found.</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CourseList;
