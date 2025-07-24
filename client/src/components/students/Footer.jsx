import React from 'react';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <style>{`
        .footer-wrapper {
          background-color: #0f172a; /* dark navy */
          color: #e2e8f0; /* light gray text */
          padding: 4rem 2rem 2rem 2rem;
          font-family: 'Segoe UI', sans-serif;
        }

        footer {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 2rem;
          max-width: 1200px;
          margin: auto;
          border-bottom: 1px solid #334155; /* gray border */
          padding-bottom: 2rem;
        }

        footer div {
          flex: 1 1 260px;
        }

        footer img {
          width: 140px;
          margin-bottom: 1rem;
        }

        footer p {
          font-size: 0.95rem;
          color: #94a3b8;
          line-height: 1.6;
        }

        footer h2 {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #f1f5f9;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        ul li {
          margin-bottom: 0.5rem;
        }

        ul li a {
          text-decoration: none;
          color: #cbd5e1;
          transition: color 0.3s;
        }

        ul li a:hover {
          color: #ffffff;
        }

        .subscribe-input {
          margin-top: 1rem;
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .subscribe-input input {
          padding: 0.6rem;
          border-radius: 6px;
          border: 1px solid #334155;
          background-color: #1e293b;
          color: #f8fafc;
          outline: none;
          min-width: 240px;
        }

        .subscribe-input button {
          padding: 0.6rem 1rem;
          background-color: #3b82f6;
          color: #ffffff;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .subscribe-input button:hover {
          background-color: #2563eb;
        }

        .footer-bottom {
          text-align: center;
          color: #64748b;
          font-size: 0.85rem;
          margin-top: 1.5rem;
        }

        @media (max-width: 640px) {
          footer {
            flex-direction: column;
            text-align: center;
          }

          .subscribe-input {
            flex-direction: column;
            align-items: center;
          }

          .subscribe-input input {
            width: 100%;
          }

          .subscribe-input button {
            width: 100%;
          }
        }
      `}</style>

      <footer>
        <div>
          <img src={assets.logo_dark} alt="logo" />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text.
          </p>
        </div>

        <div>
          <h2>Company</h2>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Privacy policy</a></li>
          </ul>
        </div>

        <div>
          <h2>Subscribe to our newsletter</h2>
          <p>The latest news, articles, and resources, sent to your inbox weekly.</p>
          <div className="subscribe-input">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </footer>

      <p className="footer-bottom">Copyright 2025 © Aditya Tiwari. All Right Reserved.</p>
    </div>
  );
};

export default Footer;
