import React, { useEffect, useState } from 'react';
import { dummyStudentEnrolled, assets } from '../../assets/assets';
import Loading from '../../components/students/Loading';

const StudentsEnrolled = () => {
  const [enrolledStudents, setEnrolledStudents] = useState(null);

  const fetchEnrolledStudents = async () => {
    setEnrolledStudents(dummyStudentEnrolled);
  };

  useEffect(() => {
    fetchEnrolledStudents();
  }, []);

  return enrolledStudents ? (
    <div style={styles.container}>
      <h2 style={styles.heading}>🎓 Students Enrolled</h2>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.th}>#</th>
              <th style={styles.th}>Student</th>
              <th style={styles.th}>Course Title</th>
              <th style={styles.th}>Date</th>
            </tr>
          </thead>
          <tbody>
            {enrolledStudents.map((item, index) => (
              <tr key={index} style={styles.tr}>
                <td>{index + 1}</td>
                <td style={styles.studentInfo}>
                  <img
                    src={item.student?.imageurl || assets.default_profile}
                    alt="Profile"
                    style={styles.image}
                    onError={(e) => (e.target.src = assets.default_profile)}
                  />
                  <span>{item.student?.name || 'Unnamed Student'}</span>
                </td>
                <td>{item.coursetitle}</td>
                <td>{new Date(item.purchaseDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default StudentsEnrolled;

// ------------------- Internal CSS -------------------
const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#f4f6f9',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    fontSize: '26px',
    fontWeight: '600',
    marginBottom: '1.5rem',
    color: '#333',
  },
  tableWrapper: {
    overflowX: 'auto',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.06)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '16px',
    color: '#333',
  },
  thead: {
    backgroundColor: '#eef0f3',
    textAlign: 'left',
  },
  th: {
    padding: '12px 16px',
    fontWeight: '600',
    borderBottom: '2px solid #ddd',
  },
  tr: {
    borderBottom: '1px solid #eee',
    transition: 'background 0.2s',
  },
  studentInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
  },
  image: {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #ddd',
  },
};
