import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const Navbar = () => {
  const { navigate, isEducator } = useContext(AppContext);
  const { openSignIn, openSignUp, signOut } = useClerk();
  const { user } = useUser();

  const isCourseListPage = window.location.pathname.includes('/course-list');

  const handleEducatorClick = () => {
    navigate('/educator'); // redirect to educator dashboard or registration
  };

  return (
    <>
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 50;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 3rem;
          border-bottom: 1px solid gray;
          background-color: ${isCourseListPage ? '#fff' : 'rgba(207, 250, 254, 0.7)'};
        }

        .logo {
          width: 9rem;
          cursor: pointer;
          margin-left: 0.5rem;
        }

        .right-section {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-right: 1rem;
        }

        .btn {
          background-color: #3b82f6;
          color: white;
          padding: 0.65rem 1.5rem;
          border-radius: 8px;
          font-size: 1.05rem;
          cursor: pointer;
          border: none;
        }

        .btn:hover {
          background-color: #2563eb;
        }

        .login-btn {
          margin-right: 2.5rem;
        }

        .link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.05rem;
        }

        .link:hover {
          text-decoration: underline;
        }

        .nav-button {
          background: none;
          border: none;
          color: gray;
          font-size: 1.05rem;
          font-weight: 500;
          cursor: pointer;
        }

        .nav-button:hover {
          color: black;
        }

        .user-icon {
          width: 1.8rem;
          height: 1.8rem;
          cursor: pointer;
        }

        .logout-btn {
          background: none;
          border: none;
          color: #ef4444;
          font-size: 1.05rem;
          font-weight: 500;
          cursor: pointer;
        }

        .logout-btn:hover {
          color: #dc2626;
          text-decoration: underline;
        }
      `}</style>

      <div className="navbar">
        <img
          onClick={() => navigate('/')}
          src={assets.logo}
          alt="Logo"
          className="logo"
        />

        <div className="right-section">
          {!user ? (
            <>
              <button className="btn" onClick={openSignUp}>
                Create Account
              </button>
              <button className="btn login-btn" onClick={openSignIn}>
                Login
              </button>
            </>
          ) : (
            <>
              <button className="nav-button" onClick={handleEducatorClick}>
                {isEducator ? 'Educator Dashboard' : 'Become Educator'}
              </button>

              <Link to="/my-enrollments" className="link">
                My Enrollments
              </Link>

              <UserButton />
              <button className="logout-btn" onClick={() => signOut(() => navigate('/'))}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
