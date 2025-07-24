import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from './Coursecard';
import { AppContext } from '../../context/AppContext';

const CourseSection = () => {
  const { allCourses } = useContext(AppContext);

  return (
    <>
      <style>{`
        .course-section {
          padding: 80px 2rem;
          background: linear-gradient(to right, #f0f4f8, #e2ecf5);
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
          text-align: center;
        }

        @media (min-width: 768px) {
          .course-section {
            padding: 100px 8rem;
          }
        }

        .course-title {
          font-size: 2.25rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1rem;
        }

        .course-desc {
          font-size: 1.125rem;
          color: #475569;
          max-width: 700px;
          margin: 0 auto 2.5rem auto;
          line-height: 1.7;
        }

        .course-list {
          display: flex;
          gap: 2.5rem;
          overflow-x: auto;
          padding-bottom: 1.5rem;
          margin-bottom: 2.5rem;
          scroll-snap-type: x mandatory;
        }

        .course-list > * {
          scroll-snap-align: start;
          flex: 0 0 auto;
        }

        .course-list::-webkit-scrollbar {
          height: 8px;
        }

        .course-list::-webkit-scrollbar-thumb {
          background: #94a3b8;
          border-radius: 10px;
        }

        .course-link {
          display: inline-block;
          padding: 14px 32px;
          font-size: 1.05rem;
          font-weight: 600;
          color: #2563eb;
          background-color: white;
          border: 2px solid #2563eb;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        .course-link:hover {
          background-color: #2563eb;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(37, 99, 235, 0.2);
        }
      `}</style>

      <div className="course-section">
        <h2 className="course-title">Learn from the Best</h2>
        <p className="course-desc">
          Discover a variety of courses taught by industry experts. Whether you're diving into coding, exploring design,
          or mastering business strategies — we have something tailored just for you.
        </p>

        <div className="course-list">
          {allCourses.slice(0, 5).map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>

        <Link
          to="/course-list"
          onClick={() => scrollTo(0, 0)}
          className="course-link"
        >
          Explore All Courses
        </Link>
      </div>
    </>
  );
};

export default CourseSection;
