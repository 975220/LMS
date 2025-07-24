import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import { Line } from 'rc-progress';
import Footer from '../../components/students/Footer';

const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseDuration, navigate } = useContext(AppContext);

  const [progress, setProgress] = useState([
    { lectureCompleted: 2, totalLecture: 4 },
    { lectureCompleted: 1, totalLecture: 5 },
    { lectureCompleted: 3, totalLecture: 6 },
    { lectureCompleted: 4, totalLecture: 10 },
    { lectureCompleted: 5, totalLecture: 8 },
    { lectureCompleted: 6, totalLecture: 12 },
    { lectureCompleted: 7, totalLecture: 10 },
    { lectureCompleted: 8, totalLecture: 10 },
    { lectureCompleted: 9, totalLecture: 10 },
    { lectureCompleted: 10, totalLecture: 10 },
    { lectureCompleted: 0, totalLecture: 2 },
  ]);

  return (
    <>
     <style>
{`
  .enrollments-container {
    max-width: 1400px; /* ⬅ increased width */
    margin: auto;
    padding: 2rem;
  }

  .enrollments-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  .enrollments-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #e5e7eb;
    box-shadow: 0 0 10px rgba(0,0,0,0.05);
    border-radius: 0.5rem;
    overflow: hidden;
    font-size: 1rem; /* ⬅ bigger font */
  }

  .enrollments-table th,
  .enrollments-table td {
    padding: 1.25rem; /* ⬅ more padding */
    border-bottom: 1px solid #e5e7eb;
    vertical-align: middle;
  }

  .enrollments-table thead {
    background-color: #f3f4f6;
    color: #1f2937;
    text-align: left;
  }

  .enrollment-row:hover {
    background-color: #f9fafb;
  }

  .course-cell {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }

  .course-thumb {
    width: 80px;
    height: 50px;
    object-fit: cover;
    border-radius: 0.375rem;
  }

  .course-title {
    font-weight: 600;
    margin-bottom: 0.25rem;
    font-size: 1.05rem;
  }

  .status-btn {
    padding: 0.5rem 1.25rem;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 0.375rem;
    border: none;
    cursor: pointer;
    transition: 0.3s;
  }

  .status-btn.completed {
    background-color: #16a34a;
    color: white;
  }

  .status-btn.progress {
    background-color: #f59e0b;
    color: white;
  }

  @media (max-width: 768px) {
    .enrollments-table,
    .enrollments-table thead,
    .enrollments-table tbody,
    .enrollments-table th,
    .enrollments-table td,
    .enrollments-table tr {
      display: block;
      width: 100%;
    }

    .enrollments-table thead {
      display: none;
    }

    .enrollment-row {
      margin-bottom: 1.25rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      padding: 1.25rem;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
    }

    .enrollments-table td {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }

    .enrollments-table td::before {
      content: attr(data-label);
      font-weight: 600;
      color: #4b5563;
    }
  }
`}
</style>


      <div className="enrollments-container">
        <h1 className="enrollments-title">My Enrollments</h1>
        <table className="enrollments-table">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Duration</th>
              <th>Completed</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {enrolledCourses.map((course, index) => {
              const courseProgress = progress[index];
              const percent =
                courseProgress && courseProgress.totalLecture > 0
                  ? (courseProgress.lectureCompleted / courseProgress.totalLecture) * 100
                  : 0;
              const isCompleted = courseProgress?.lectureCompleted === courseProgress?.totalLecture;

              return (
                <tr key={index} className="enrollment-row">
                  <td>
                    <div className="course-cell">
                      <img
                        src={course.courseThumbnail || assets.course_1_thumbnail}
                        alt=""
                        className="course-thumb"
                      />
                      <div>
                        <p className="course-title">{course.courseTitle}</p>
                        <Line
                          strokeWidth={4}
                          percent={percent}
                          strokeColor="#2563eb"
                          trailColor="#e5e7eb"
                        />
                      </div>
                    </div>
                  </td>
                  <td>{calculateCourseDuration(course)}</td>
                  <td>
                    {courseProgress &&
                      `${courseProgress.lectureCompleted} / ${courseProgress.totalLecture}`} Lectures
                  </td>
                  <td>
                    <button
                      className={`status-btn ${isCompleted ? 'completed' : 'progress'}`}
                      onClick={() => navigate(`/player/${course._id}`)}
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
    </>
  );
};

export default MyEnrollments;
