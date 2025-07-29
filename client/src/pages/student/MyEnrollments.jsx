import React from 'react';
import { Line } from 'rc-progress';
import Footer from '../../components/students/Footer';

const enrollments = [
  {
    _id: '1',
    title: 'Mastering JavaScript',
    duration: '8h 10m',
    completedLectures: 6,
    totalLectures: 10,
  },
  {
    _id: '2',
    title: 'Fullstack Web Development',
    duration: '15h 20m',
    completedLectures: 10,
    totalLectures: 20,
  },
  {
    _id: '3',
    title: 'Python for Data Science',
    duration: '12h 30m',
    completedLectures: 12,
    totalLectures: 12,
  },
  {
    _id: '4',
    title: 'Machine Learning Basics',
    duration: '10h 5m',
    completedLectures: 3,
    totalLectures: 8,
  },
  {
    _id: '5',
    title: 'Database Design',
    duration: '9h 45m',
    completedLectures: 9,
    totalLectures: 10,
  },
];

const MyEnrollments = () => {
  return (
    <div className="enrollment-container">
      <h2 className="title">📚 My Enrollments</h2>

      <div className="table-wrapper">
        <table className="enrollment-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Duration</th>
              <th>Progress</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((course) => {
              const percent = (course.completedLectures / course.totalLectures) * 100;
              const isCompleted = course.completedLectures === course.totalLectures;

              return (
                <tr key={course._id}>
                  <td data-label="Course" className="course-title">{course.title}</td>
                  <td data-label="Duration">{course.duration}</td>
                  <td data-label="Progress">
                    {course.completedLectures} / {course.totalLectures} Lectures
                    <Line
                      percent={percent}
                      strokeWidth={4}
                      strokeColor="#2563eb"
                      trailColor="#e5e7eb"
                      style={{ marginTop: '8px', maxWidth: '200px' }}
                    />
                  </td>
                  <td data-label="Status">
                    <button
                      className={`status-btn ${isCompleted ? 'completed' : 'progress'}`}
                    >
                      {isCompleted ? 'Completed' : 'In Progress'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Footer />

      <style>{`
        .enrollment-container {
          max-width: 1200px;
          margin: auto;
          padding: 2rem;
          font-family: 'Segoe UI', sans-serif;
        }

        .title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 2rem;
          text-align: center;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .enrollment-table {
          width: 100%;
          border-collapse: collapse;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
        }

        .enrollment-table th,
        .enrollment-table td {
          padding: 1rem;
          border-bottom: 1px solid #e5e7eb;
          text-align: left;
          vertical-align: middle;
        }

        .enrollment-table thead {
          background-color: #f9fafb;
        }

        .enrollment-table tr:hover {
          background-color: #f5f5f5;
        }

        .course-title {
          font-weight: 600;
          color: #1f2937;
        }

        .status-btn {
          padding: 0.5rem 1rem;
          font-size: 0.95rem;
          font-weight: 500;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .status-btn.completed {
          background-color: #16a34a;
          color: white;
        }

        .status-btn.progress {
          background-color: #f59e0b;
          color: white;
        }

        .footer {
          text-align: center;
          margin-top: 2rem;
          padding: 1rem;
          font-size: 0.9rem;
          color: #6b7280;
        }

        @media (max-width: 768px) {
          .enrollment-table,
          .enrollment-table thead,
          .enrollment-table tbody,
          .enrollment-table tr,
          .enrollment-table th,
          .enrollment-table td {
            display: block;
            width: 100%;
          }

          .enrollment-table thead {
            display: none;
          }

          .enrollment-table tr {
            background: #fff;
            margin-bottom: 1rem;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 1rem;
            box-shadow: 0 1px 5px rgba(0, 0, 0, 0.03);
          }

          .enrollment-table td {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.75rem;
          }

          .enrollment-table td::before {
            content: attr(data-label);
            font-weight: 600;
            color: #4b5563;
            margin-right: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MyEnrollments;
