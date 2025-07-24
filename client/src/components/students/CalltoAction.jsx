import React from 'react';
import { assets } from '../../assets/assets'; // ✅ Fixed import

const CalltoAction = () => {
  return (
    <div className="cta-container">
      <style>{`
        .cta-container {
          text-align: center;
          background: linear-gradient(to right, #e0f7fa, #ffffff);
          padding: 4rem 2rem;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          margin: 3rem auto;
          max-width: 900px;
        }

        .cta-container h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1e3a8a;
          margin-bottom: 1rem;
        }

        .cta-container p {
          font-size: 1.1rem;
          color: #374151;
          margin-bottom: 2rem;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .cta-buttons button {
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cta-buttons button:first-child {
          background-color: #3b82f6;
          color: white;
        }

        .cta-buttons button:first-child:hover {
          background-color: #2563eb;
        }

        .cta-buttons button:last-child {
          background-color: transparent;
          color: #3b82f6;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
        }

        .cta-buttons button:last-child:hover {
          text-decoration: underline;
        }

        .cta-buttons img {
          width: 18px;
          height: 18px;
        }
      `}</style>

      <h1>Ready to take the next step?</h1>
      <p>Inspiring journeys shared by real learners—see how our courses changed their lives.</p>

      <div className="cta-buttons">
        <button>Get Started</button>
        <button>
          Learn More <img src={assets.arrow_icon} alt="Arrow" />
        </button>
      </div>
    </div>
  );
};

export default CalltoAction;
