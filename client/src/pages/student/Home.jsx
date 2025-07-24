import React from 'react';
import Hero from '../../components/students/Hero';
import Companies from '../../components/students/Companies';
import CourseSection from '../../components/students/CourseSection';
import TestimoniolasSection from '../../components/students/TestimoniolasSection';
import CalltoAction from '../../components/students/CalltoAction';
import Footer from '../../components/students/Footer';

const Home = () => {
  return (
    <>
      <style>
        {`
          .home-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>

      <div className="home-container">
        <Hero />
        <Companies />
        <CourseSection /> 
        <TestimoniolasSection /> 
        <CalltoAction />  
        <Footer />  
      </div>
    </>
  );
};

export default Home;
