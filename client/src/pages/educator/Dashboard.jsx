import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets, dummyDashboardData } from '../../assets/assets';
import Loading from '../../components/students/Loading';

const Dashboard = () => {
  const { currency } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatAmount = (amount) => {
    return Number(amount).toLocaleString('en-IN', {
      maximumFractionDigits: 2,
    });
  };

  return dashboardData ? (
    <div style={styles.container}>
      {/* Earnings Alert if 0 */}
      {dashboardData.totalEarning === 0 && (
        <div style={styles.alert}>
          ⚠ You haven't earned anything yet! Start publishing your courses.
        </div>
      )}

      {/* Top Cards */}
      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <img src={assets.patients_icon} alt="students" style={styles.icon} />
          <div>
            <p style={styles.cardValue}>{dashboardData.enrolledStudentsData.length}</p>
            <p style={styles.cardLabel}>Total Enrollments</p>
          </div>
        </div>

        <div style={styles.card}>
          <img src={assets.appointments_icon} alt="courses" style={styles.icon} />
          <div>
            <p style={styles.cardValue}>{dashboardData.totalCourse}</p>
            <p style={styles.cardLabel}>Total Courses</p>
          </div>
        </div>

        <div style={{ ...styles.card, ...styles.earningCard }}>
          <img src={assets.earning_icon} alt="earnings" style={styles.icon} />
          <div>
            <p style={styles.earningAmount}>
              {currency} {formatAmount(dashboardData.totalEarning || 0)}
            </p>
            <p style={styles.cardLabel}>
              {dashboardData.totalEarning === 0 ? '⚠ No earnings yet!' : 'Total Earnings'}
            </p>
          </div>
        </div>
      </div>

      {/* Enrolled Students Table */}
      <div style={styles.enrollmentSection}>
        <h2 style={styles.sectionTitle}>Top Enrolled Students</h2>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>#</th>
                <th style={styles.th}>Student</th>
                <th style={styles.th}>Course Title</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.enrolledStudentsData.map((item, index) => (
                <tr key={index} style={index % 2 === 0 ? styles.tr : styles.trAlt}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={{ ...styles.td, ...styles.studentCell }}>
                    {item.student?.image?.url ? (
                      <img
                        src={item.student.image.url}
                        alt="Profile"
                        style={styles.profileImage}
                      />
                    ) : (
                      <div style={{ ...styles.profileImage, backgroundColor: '#ccc' }} />
                    )}
                    <span>{item.student?.name || 'Unnamed Student'}</span>
                  </td>
                  <td style={styles.td}>{item.courseTitle || 'Untitled Course'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;

// ------------------- Internal CSS -------------------
const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#f0f4f8',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', sans-serif",
  },
  alert: {
    backgroundColor: '#fff3cd',
    padding: '12px 20px',
    borderRadius: '8px',
    color: '#856404',
    fontWeight: '600',
    marginBottom: '20px',
  },
  cardContainer: {
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap',
    marginBottom: '2rem',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    background: 'linear-gradient(to right, #ffffff, #f9fbfd)',
    padding: '1.2rem 1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
    flex: '1 1 280px',
  },
  icon: {
    width: '42px',
    height: '42px',
  },
  cardValue: {
    fontSize: '26px',
    fontWeight: '700',
    color: '#1f2937',
    margin: 0,
  },
  cardLabel: {
    fontSize: '14px',
    color: '#6b7280',
    marginTop: '4px',
  },
  earningCard: {
    background: 'linear-gradient(to right, #fff7e6, #ffe8cc)',
    borderLeft: '6px solid #ffa726',
  },
  earningAmount: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#e65100',
  },
  enrollmentSection: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#111827',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '15px',
    color: '#374151',
  },
  th: {
    textAlign: 'left',
    padding: '12px 10px',
    backgroundColor: '#f3f4f6',
    fontWeight: '600',
    fontSize: '14px',
    borderBottom: '2px solid #e5e7eb',
  },
  tr: {
    backgroundColor: '#fff',
  },
  trAlt: {
    backgroundColor: '#f9fafb',
  },
  td: {
    padding: '12px 10px',
    verticalAlign: 'middle',
  },
  studentCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  profileImage: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
};
