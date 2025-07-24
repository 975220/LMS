import React from 'react';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <>
      <footer style={styles.footer}>
        <div style={styles.leftSection}>
          <img src={assets.logo} alt="logo" style={styles.logo} />
          <p style={styles.text}>
            © 2025 Aditya Tiwari. All rights reserved.
          </p>
        </div>

        <div style={styles.socialIcons}>
          <a href="#" style={styles.iconLink}>
            <img src={assets.facebook_icon} alt="Facebook" style={styles.icon} />
          </a>
          <a href="#" style={styles.iconLink}>
            <img src={assets.twitter_icon} alt="Twitter" style={styles.icon} />
          </a>
          <a href="#" style={styles.iconLink}>
            <img src={assets.instagram_icon} alt="Instagram" style={styles.icon} />
          </a>
        </div>
      </footer>
    </>
  );
};

const styles = {
  footer: {
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderTop: '1px solid #ccc',
    gap: '20px',
  },
  leftSection: {
    textAlign: 'center',
  },
  logo: {
    width: '120px',
    marginBottom: '10px',
  },
  text: {
    fontSize: '14px',
    color: '#666',
  },
  socialIcons: {
    display: 'flex',
    gap: '15px',
  },
  icon: {
    width: '30px',
    height: '30px',
  },
  iconLink: {
    display: 'inline-block',
  },
};

export default Footer;
