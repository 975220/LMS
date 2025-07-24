import React from 'react';
import { assets } from '../../assets/assets';
import Searchbar from './Searchbar';

const Hero = () => {
  return (
    <>
      <style>
        {`
          .hero {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 80px 24px;
            background: linear-gradient(135deg, #eef2ff, #f0fdfa);
            position: relative;
            overflow: hidden;
          }

          .hero h1 {
            font-size: 2.5rem;
            font-weight: 800;
            color: #1e293b;
            max-width: 900px;
            margin: 0 auto;
            line-height: 1.4;
            position: relative;
            z-index: 2;
          }

          .hero h1 span {
            color: #3b82f6;
            background: linear-gradient(to right, #3b82f6, #6366f1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .hero p {
            color: #475569;
            max-width: 750px;
            margin-top: 28px;
            font-size: 1.15rem;
            line-height: 1.8;
            z-index: 2;
            position: relative;
          }

          .sketch-img {
            position: absolute;
            bottom: 0;
            right: 40px;
            width: 120px;
            opacity: 0.8;
            z-index: 1;
            display: none;
          }

          @media (min-width: 768px) {
            .hero h1 {
              font-size: 3.25rem;
            }

            .hero p {
              font-size: 1.25rem;
            }

            .sketch-img {
              display: block;
            }
          }
        `}
      </style>

      <div className="hero">
        <h1>
          Empower your future with our Learning Course designed to{' '}
          <span>fit your choice of Management System ..</span>
          <img src={assets.sketch} alt="sketch" className="sketch-img" />
        </h1>

        <p>
          We bring together world-class instructors and a flexible curriculum to help you succeed.
          The support is tailored to your needs, ensuring you get the most out of your learning
          experience.
        </p>

        <Searchbar />
      </div>
    </>
  );
};

export default Hero;
