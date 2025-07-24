import React from 'react';
import { assets } from '../../assets/assets';

const Companies = () => {
  return (
    <>
      <style>
        {`
          .companies-container {
            padding-top: 64px;
            text-align: center;
          }

          .companies-text {
            font-size: 1rem;
            color: #6b7280;
          }

          .companies-logos {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            gap: 20px;
            margin-top: 24px;
          }

          .company-logo {
            width: 100px;
            transition: transform 0.2s ease;
          }

          .company-logo:hover {
            transform: scale(1.08);
          }

          @media (min-width: 768px) {
            .companies-logos {
              gap: 64px;
              margin-top: 40px;
            }

            .company-logo {
              width: 140px;
            }
          }
        `}
      </style>

      <div className="companies-container">
        <p className="companies-text">Trusted by learners from top companies</p>
        <div className="companies-logos">
          <img src={assets.microsoft_logo} alt="Microsoft" className="company-logo" />
          <img src={assets.walmart_logo} alt="Walmart" className="company-logo" />
          <img src={assets.accenture_logo} alt="Accenture" className="company-logo" />
          <img src={assets.adobe_logo} alt="Adobe" className="company-logo" />
          <img src={assets.paypal_logo} alt="PayPal" className="company-logo" />
        </div>
      </div>
    </>
  );
};

export default Companies;
