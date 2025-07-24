import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/educator/Navbar';
import Sidebar from '../../components/educator/Sidebar';
import Footer from '../../components/educator/Footer';

const Educator = () => {
  return (
    <div style={styles.pageWrapper}>
      <Navbar />

      <div style={styles.mainWrapper}>
        <Sidebar />
        <div style={styles.contentArea}>
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

const styles = {
  pageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
  },
  mainWrapper: {
    display: 'flex',
    flex: 1,
    minHeight: 'calc(100vh - 120px)', // adjust if Navbar/Footer height changes
  },
  contentArea: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
  },
};

export default Educator;
