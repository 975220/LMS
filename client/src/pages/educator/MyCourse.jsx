import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/students/Loading';

const MyCourse = () => {
  const { currency, allCourses } = useContext(AppContext);
  const [courses, setCourses] = useState(null);

  const fetchEducatorCourses = async () => {
    setCourses(allCourses);
  };

  useEffect(() => {
    fetchEducatorCourses();
  }, []);

  return courses ? (
    <div style={styles.container}>
      <h2 style={styles.heading}>📚 My Courses</h2>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>Course</th>
              <th style={styles.th}>Earnings</th>
              <th style={styles.th}>Students</th>
              <th style={styles.th}>Published On</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => {
              const enrolledCount = course.enrolledstudents?.length || 0;
              const effectivePrice =
                course.coursePrice -
                (course.discount * course.coursePrice) / 100;
              const totalEarning = enrolledCount * effectivePrice;

              return (
                <tr key={course._id} style={styles.row}>
                  <td style={styles.courseInfo}>
                    <img
                      src={course.courseThumbnail}
                      alt="Course"
                      style={styles.thumbnail}
                      onError={(e) =>
                        (e.target.src = 'https://via.placeholder.com/60x40')
                      }
                    />
                    <span>{course.courseTitle || 'Untitled Course'}</span>
                  </td>
                  <td style={styles.td}>
                    {currency} {totalEarning.toLocaleString()}
                  </td>
                  <td style={styles.td}>{enrolledCount}</td>
                  <td style={styles.td}>
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MyCourse;

// ---------------- Internal CSS ----------------
const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '28px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#333',
  },
  tableWrapper: {
    overflowX: 'auto',
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  headerRow: {
    backgroundColor: '#f0f0f0',
    textAlign: 'left',
  },
  th: {
    padding: '12px',
    fontWeight: '600',
    borderBottom: '2px solid #ddd',
  },
  row: {
    borderBottom: '1px solid #eee',
  },
  td: {
    padding: '12px',
    verticalAlign: 'middle',
  },
  courseInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
  },
  thumbnail: {
    width: '60px',
    height: '40px',
    objectFit: 'cover',
    borderRadius: '6px',
  },
};
