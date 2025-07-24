import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const { isEducator } = useContext(AppContext);

  const menuItem = [
    { name: 'Dashboard', path: '/educator', icon: assets.home_icon },
    { name: 'Add Course', path: '/educator/add-course', icon: assets.add_icon },
    { name: 'My Course', path: '/educator/my-course', icon: assets.my_course_icon },
    { name: 'Students Enrolled', path: '/educator/student-enrolled', icon: assets.person_tick_icon },
  ];

  return isEducator && (
    <div style={styles.sidebar}>
      {menuItem.map((item) => (
        <NavLink
          to={item.path}
          key={item.name}
          end={item.path === '/educator'}
          style={({ isActive }) => ({
            ...styles.link,
            backgroundColor: isActive ? '#eef2ff' : 'transparent'
          })}
        >
          <img src={item.icon} alt={item.name} style={styles.icon} />
          <p style={styles.text}>{item.name}</p>
        </NavLink>
      ))}
    </div>
  );
};

const styles = {
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRight: '1px solid #ddd',
    height: '100vh',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 15px',
    borderRadius: '8px',
    textDecoration: 'none',
    color: '#333',
    transition: 'background-color 0.3s',
  },
  icon: {
    width: '24px',
    height: '24px',
  },
  text: {
    fontSize: '16px',
  },
};

export default Sidebar;
