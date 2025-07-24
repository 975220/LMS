import React from 'react';
import { assets, dummyEducatorData } from '../../assets/assets';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const educatorData = dummyEducatorData;
  const { user } = useUser();

  return (
    <div style={styles.navbar}>
      <Link to="/">
        <img src={assets.logo} alt="Logo" style={styles.logo} />
      </Link>

      <div style={styles.rightSection}>
        <span style={styles.greeting}>
          Hi! {user ? user.fullName : 'Developers'}
        </span>

        {user ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <img
            src={assets.profile_img}
            alt="profile"
            style={styles.profileImg}
          />
        )}
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px 30px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #ddd',
  },
  logo: {
    height: '50px',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  greeting: {
    fontSize: '16px',
    color: '#333',
  },
  profileImg: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
};

export default Navbar;
