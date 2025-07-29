import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Searchbar from '../../components/students/Searchbar';
import CourseCard from '../../components/students/Coursecard';
import Footer from '../../components/students/Footer';
import { assets } from '../../assets/assets';
import API from '../../utils/api';

const CourseList = () => {
  const navigate = useNavigate();
  const { input } = useParams();
  const [allCourses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get('/api/courses');
        setAllCourses(res.data || []);
      } catch (err) {
        console.error('Failed to fetch courses:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    if (!allCourses.length) return;

    const filtered = input
      ? allCourses.filter(course =>
          course.courseTitle?.toLowerCase().includes(input.toLowerCase())
        )
      : allCourses;

    setFilteredCourses(filtered);
    scrollTo(0, 0);
  }, [input, allCourses]);

  return (
    <>
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
          {loading ? (
            <p className="loading">Loading courses...</p>
          ) : filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <CourseCard key={course._id} course={course} />
            ))
          ) : (
            <p className="no-courses">No courses found.</p>
          )}
        </div>
      </div>

      <Footer />

      <style>{`
        .course-list-container {
          padding: 2rem 3rem;
          max-width: 1440px;
          margin: auto;
        }

        .course-list-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .course-list-header p {
          color: #4b5563;
          font-size: 1.125rem;
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

        .no-courses,
        .loading {
          font-size: 1.1rem;
          color: #9ca3af;
          margin-top: 2rem;
        }
      `}</style>
    </>
  );
};

export default CourseList;
 